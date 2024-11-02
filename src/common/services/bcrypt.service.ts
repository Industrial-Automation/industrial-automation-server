import { compare, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  hashData(data: string, saltOrRounds: number | string = 10) {
    return hash(data, saltOrRounds);
  }

  compareData(data: string, encrypted: string) {
    return compare(data, encrypted);
  }
}
