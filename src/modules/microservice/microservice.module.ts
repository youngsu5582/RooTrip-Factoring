import { Module } from "@nestjs/common";
import { SendVertificationEmailMessageController } from "./send-vertification-email.message.controller";
import { EmailerModule } from "@src/providers/emailer/emailer.module";
import { EmailerProvider } from "@src/providers/emailer/emailer.provider";





const messageControllers = [SendVertificationEmailMessageController];


@Module({
  imports: [EmailerModule],
  controllers: [...messageControllers],
  providers: [EmailerProvider],
})
export class MicroserviceModule {}
