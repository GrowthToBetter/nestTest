import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {
    name: string;
  } {
    const data = {
      name: 'Hello World',
    };
    return data;
  }
  getNull(): string {
    return '<h1 style="color: red">NullableValue</h1>';
  }
  getNumber(): number {
    return 1;
  }
}
