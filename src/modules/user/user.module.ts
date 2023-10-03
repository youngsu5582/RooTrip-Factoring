import { Module, Provider } from '@nestjs/common';
import { CreateUserCommandHandler } from './commands/create-local-user/create-local-user.service';
import { CreateLocalUserController } from './commands/create-local-user/create-local-user.controller';
import { USER_REPOSITORY } from './user.di-token';
import { UserRepository } from './database/user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { SendVertificationEmailEventListener } from './listeners/send-vertification-email.event-listener';
import { SaveTemporalRegisterDataEventListener } from './listeners/save-temporal-register-data.event-listener';
import { ProviderModule } from '@src/providers/provider.module';

const httpControllers = [CreateLocalUserController];

const commandHandler: Provider[] = [CreateUserCommandHandler];
const repositoires: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];
const listeners: Provider[] = [
  SendVertificationEmailEventListener,
  SaveTemporalRegisterDataEventListener,
];

@Module({
  imports: [CqrsModule, ProviderModule],
  controllers: [...httpControllers],
  providers: [...commandHandler, ...repositoires, ...listeners],
})
export class UserModule {}
