import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UUIDService {
  generate(): string {
    return randomUUID();
  }
}
