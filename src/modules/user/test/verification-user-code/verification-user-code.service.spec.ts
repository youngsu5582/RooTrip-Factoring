import { EventEmitter2 } from '@nestjs/event-emitter';
import { VerificationUserCodeCommandHandler } from '../../commands/verification-user-code/verification-user-code.service';
import UserRepositoryPort from '../../database/user.repository.port';
import { VerificationUserCodeCommand } from '../../commands/verification-user-code/verification-user-code.command';
import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from '../../user.di-token';
import typia from 'typia';
import { RedisProvider } from '@src/providers/redis/redis.provider';
import { CreateLocalUserProps } from '../../domain/user.type';
import {
  CodeNotExistError,
  EmailAlreadyExistError,
  NicknameAlreadyExistError,
} from '../../domain/user.error';

describe('VerificationUserCodeCommandHandler', () => {
  let handler: VerificationUserCodeCommandHandler;
  let repository: UserRepositoryPort;
  let eventEmitter: EventEmitter2;
  let command: VerificationUserCodeCommand;
  let provider: RedisProvider;
  let redisResoloveResult: CreateLocalUserProps & { id: string };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: USER_REPOSITORY,
          useValue: {
            findByEmail: jest.fn(),
            findByNickname: jest.fn(),
            createLocalUserWithProfile: jest.fn(),
          },
        },
        EventEmitter2,
        RedisProvider,
        VerificationUserCodeCommandHandler,
      ],
    }).compile();
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    repository = module.get(USER_REPOSITORY);
    provider = module.get(RedisProvider);
    handler = module.get<VerificationUserCodeCommandHandler>(
      VerificationUserCodeCommandHandler,
    );
    command = new VerificationUserCodeCommand(
      typia.random<VerificationUserCodeCommand>(),
    );

    redisResoloveResult = typia.random<CreateLocalUserProps & { id: string }>();
  });
  it('should create a new user', async () => {
    jest
      .spyOn(provider, 'getDataWithJson')
      .mockResolvedValue(redisResoloveResult);
    jest
      .spyOn(repository, 'createLocalUserWithProfile')
      .mockResolvedValue(undefined);
    jest.spyOn(eventEmitter, 'emitAsync');

    const result = await handler.execute(command);
    expect(result.isOk()).toBe(true);
    expect(repository.createLocalUserWithProfile).toHaveBeenCalledTimes(1);
    expect(eventEmitter.emitAsync).toHaveBeenCalledTimes(1);
  });
  it('should handle code not exists return err', async () => {
    jest.spyOn(provider, 'getDataWithJson').mockResolvedValue(null);
    const result = await handler.execute(command);
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr()).toBeInstanceOf(CodeNotExistError);
  });
  it('should handle email already exists return error ', async () => {
    jest
      .spyOn(provider, 'getDataWithJson')
      .mockResolvedValue(redisResoloveResult);
    jest.spyOn(repository, 'findByEmail').mockResolvedValue({ id: 'user_id' });
    const result = await handler.execute(command);
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr()).toBeInstanceOf(EmailAlreadyExistError);
  });
  it('should handle nickname already exists return error', async () => {
    jest
      .spyOn(provider, 'getDataWithJson')
      .mockResolvedValue(redisResoloveResult);
    jest
      .spyOn(repository, 'findByNickname')
      .mockResolvedValue({ id: 'user_id' });
    const result = await handler.execute(command);
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr()).toBeInstanceOf(NicknameAlreadyExistError);
  });
});
