import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../user.di-token';
import { Err, Ok, Result } from 'oxide.ts';
import { UserEntity } from '../../domain/user.entity';
import { CreateLocalUserCommand } from './create-local-user.command';
import UserRepositoryPort from '../../database/user.repository.port';
import {
  EmailAlreadyExistError,
  NicknameAlreadyExistError,
} from '../../domain/user.error';
import { EventEmitter2 } from '@nestjs/event-emitter';

@CommandHandler(CreateLocalUserCommand)
export class CreateUserCommandHandler implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(
    command: CreateLocalUserCommand,
  ): Promise<
    Result<string, EmailAlreadyExistError | NicknameAlreadyExistError>
  > {
    const { email, nickname } = command;
    if (await this.userRepository.findByEmail(email))
      return Err(new EmailAlreadyExistError());
    if (await this.userRepository.findByNickname(nickname))
      return Err(new NicknameAlreadyExistError());

    const user = UserEntity.create(command);
    await user.publishEvents(this.eventEmitter);
    return Ok(user.id);
  }
}
