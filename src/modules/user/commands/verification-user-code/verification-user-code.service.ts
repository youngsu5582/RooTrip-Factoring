import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RedisProvider } from '@src/providers/redis/redis.provider';
import { Err, Ok, Result } from 'oxide.ts';
import { VerificationUserCodeCommand } from './verification-user-code.command';
import {
  CodeNotExistError,
  EmailAlreadyExistError,
  NicknameAlreadyExistError,
} from '../../domain/user.error';
import { CreateLocalUserProps } from '../../domain/user.type';
import { USER_REPOSITORY } from '../../user.di-token';
import { Inject } from '@nestjs/common';
import UserRepositoryPort from '../../database/user.repository.port';
import { UserEntity } from '../../domain/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@CommandHandler(VerificationUserCodeCommand)
export class VerificationUserCodeCommandHandler implements ICommandHandler {
  constructor(
    private readonly redis: RedisProvider,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async execute(
    command: VerificationUserCodeCommand,
  ): Promise<
    Result<
      null,
      CodeNotExistError | EmailAlreadyExistError | NicknameAlreadyExistError
    >
  > {
    const key = `temporalRegister : ${command.code}`;
    const props = await this.redis.getDataWithJson<
      CreateLocalUserProps & { id: string }
    >(key);

    if (!props) return Err(new CodeNotExistError());

    const { email, nickname } = props;

    if (await this.userRepository.findByEmail(email))
      return Err(new EmailAlreadyExistError());
    if (await this.userRepository.findByNickname(nickname))
      return Err(new NicknameAlreadyExistError());

    await this.userRepository.createLocalUserWithProfile(props);
    const user = UserEntity.confirm(props.id, key);
    user.publishEvents(this.eventEmitter);
    return Ok(null);
  }
}
