// attendance/attendance.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { subDays } from 'date-fns';

@Injectable()
export class AttendanceService {
  private prisma = new PrismaClient();

  async record(dto) {
    // ensure unique per user/date
    const dateOnly = new Date(dto.date);
    try {
      const rec = await this.prisma.attendance.create({
        data: {
          userId: dto.userId,
          date: dateOnly,
          status: dto.status,
          note: dto.note,
        },
      });
      return rec;
    } catch (e) {
      throw new BadRequestException('Attendance already recorded for that date or invalid data');
    }
  }

  async history(userId: string, skip = 0, take = 50) {
    return this.prisma.attendance.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      skip,
      take,
    });
  }

  async monthlySummary(userId: string, year: number, month: number) {
    // get first / last day
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 1));
    const records = await this.prisma.attendance.findMany({
      where: { userId, date: { gte: start, lt: end } },
    });

    const totalDays = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const late = records.filter(r => r.status === 'late').length;
    const izin = records.filter(r => r.status === 'izin').length;

    return {
      userId,
      year,
      month,
      totalDays,
      present,
      absent,
      late,
      izin,
      percentagePresent: totalDays ? +(present / totalDays * 100).toFixed(2) : 0,
    };
  }

  async analysis(body) {
    // simple analysis: compute presence percentage per user or per group
    const { from, to, groupBy, filterGroup } = body;
    const where: any = {};
    if (from) where.date = { gte: new Date(from) };
    if (to) where.date = { ...where.date, lt: new Date(to) };

    // join with user
    const raw = await this.prisma.attendance.groupBy({
      by: ['userId', 'status'],
      where,
      _count: { _all: true },
    });

    // map to per-user totals
    const userTotals: Record<string, any> = {};
    for (const r of raw) {
      if (!userTotals[r.userId]) userTotals[r.userId] = { counts: {}, total: 0 };
      userTotals[r.userId].counts[r.status] = r._count._all;
      userTotals[r.userId].total += r._count._all;
    }

    // fetch user info
    const userIds = Object.keys(userTotals);
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds }, ...(filterGroup ? { group: filterGroup } : {}) },
    });

    const results = users.map(u => {
      const t = userTotals[u.id] || { counts: {}, total: 0 };
      const present = t.counts['present'] || 0;
      const percent = t.total ? +(present / t.total * 100).toFixed(2) : 0;
      return {
        userId: u.id,
        nama: u.nama,
        group: u.group,
        role: u.role,
        total: t.total,
        present,
        percentagePresent: percent,
      };
    });

    // optionally group by role/group
    if (groupBy === 'group') {
      const agg = {};
      for (const r of results) {
        const key = r.group || 'unknown';
        if (!agg[key]) agg[key] = { users: 0, total: 0, present: 0 };
        agg[key].users += 1;
        agg[key].total += r.total;
        agg[key].present += r.present;
      }
      // compute percentages per group
      return Object.entries(agg).map(([group, v]: any) => ({
        group,
        users: v.users,
        total: v.total,
        present: v.present,
        percentagePresent: v.total ? +(v.present / v.total * 100).toFixed(2) : 0,
      }));
    }

    return results;
  }
}
