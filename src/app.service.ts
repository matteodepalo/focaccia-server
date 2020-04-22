import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  randomNumber() {
    return Math.random() * 100;
  }
}
