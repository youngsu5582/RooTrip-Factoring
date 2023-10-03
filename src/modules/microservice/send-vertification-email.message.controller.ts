import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SEND_VERTIFICATION_EMAIL } from '../user/user.di-token';
import { EmailerProvider } from '@src/providers/emailer/emailer.provider';
import { SendVertificationPayload } from '@src/types';

@Controller()
export class SendVertificationEmailMessageController {
  constructor(private readonly emailerProvider: EmailerProvider) {}
  @MessagePattern(SEND_VERTIFICATION_EMAIL)
  async execute(@Payload() payload: SendVertificationPayload) {
    this.emailerProvider.sendVertification(payload);
  }
}
