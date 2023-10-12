import { EventEmitter2 } from '@nestjs/event-emitter';
import UserRepositoryPort from '../../database/user.repository.port';
import { CreateUserCommandHandler } from '../../commands/create-local-user/create-local-user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateLocalUserCommand } from '../../commands/create-local-user/create-local-user.command';
import typia from 'typia';
import { CreateLocalUserProps } from '../../domain/user.type';
import {
  EmailAlreadyExistError,
  NicknameAlreadyExistError,
} from '../../domain/user.error';
import { USER_REPOSITORY } from '../../user.di-token';

describe('CreateUserCommandHandler', () => {
  let createUserHandler: CreateUserCommandHandler;
  let userRepository: UserRepositoryPort;
  let eventEmitter: EventEmitter2;
  let command: CreateLocalUserCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: USER_REPOSITORY,
          useValue: {
            findByEmail: jest.fn(),
            findByNickname: jest.fn(),
          },
        },
        CreateUserCommandHandler,
        EventEmitter2,
      ],
    }).compile();
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    userRepository = module.get<UserRepositoryPort>(USER_REPOSITORY);
    createUserHandler = module.get<CreateUserCommandHandler>(
      CreateUserCommandHandler,
    );
    command = new CreateLocalUserCommand(typia.random<CreateLocalUserProps>());
  });

  it('should return Ok with two events emitting', async () => {
    jest.spyOn(eventEmitter, 'emitAsync');
    const result = await createUserHandler.execute(command);
    expect(result.isOk()).toBe(true);
    expect(eventEmitter.emitAsync).toHaveBeenCalledTimes(2);
  });
  it('should handle email already exists return Err ', async () => {
    jest
      .spyOn(userRepository, 'findByEmail')
      .mockResolvedValue({ id: 'user_id' });
    const result = await createUserHandler.execute(command);
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr()).toBeInstanceOf(EmailAlreadyExistError);
  });
  it('should handle nickname already exists return error', async () => {
    jest
      .spyOn(userRepository, 'findByNickname')
      .mockResolvedValue({ id: 'user_id' });
    const result = await createUserHandler.execute(command);
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr()).toBeInstanceOf(NicknameAlreadyExistError);
  });
});
