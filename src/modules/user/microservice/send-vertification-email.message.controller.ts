import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SEND_VERTIFICATION_EMAIL } from '../user.di-token';

@Controller()
export class SendVertificationEmailMessageController {
  @MessagePattern(SEND_VERTIFICATION_EMAIL)
  async execute(@Payload() payload: { email: string; url: string }) {
    payload;
  }
}
