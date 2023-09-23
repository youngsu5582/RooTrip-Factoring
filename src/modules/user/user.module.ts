import { Module, Provider } from '@nestjs/common';
import { CreateUserCommandHandler } from './commands/create-local-user/create-local-user.service';
import { CreateUserController } from './commands/create-local-user/create-local-user.controller';
import { USER_REPOSITORY } from './user.di-token';
import { UserRepository } from './database/user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { SendVertificationEmailEventListener } from './listeners/send-vertification-email.event-listener';
import { SaveTemporalRegisterDataEventListener } from './listeners/save-temporal-register-data.event-listener';

const httpControllers = [CreateUserController];
const commandHandler: Provider[] = [CreateUserCommandHandler];
const repositoires: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];
const listeners: Provider[] = [SendVertificationEmailEventListener,SaveTemporalRegisterDataEventListener];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [...commandHandler, ...repositoires, ...listeners],
})
export class UserModule {}
