import { Body, Controller, Post } from '@nestjs/common';

import { SignUpDto } from '../dto';
import { SignUpService } from '../services';

@Controller('auth/sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  async signUp(@Body() dto: SignUpDto) {
    const response = await this.signUpService.signUp(dto);

    return response;
  }
}
