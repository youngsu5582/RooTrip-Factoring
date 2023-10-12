import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { ResponseBase } from '@src/libs/api/response.base';
import {
  EmailAlreadyExistError,
  NicknameAlreadyExistError,
} from '../../domain/user.error';
import { CreateLocalUserController } from '../../commands/create-local-user/create-local-user.controller';
import { CreateLocalUserCommand } from '../../commands/create-local-user/create-local-user.command';
import { CreateLocalUserProps } from '../../domain/user.type';
import typia from 'typia';
import { Err, Ok, Result, match } from 'oxide.ts';

describe('CreateLocalUserController', () => {
  let controller: CreateLocalUserController;
  let commandBus: CommandBus;
  let commandResult: Result<
    string,
    EmailAlreadyExistError | NicknameAlreadyExistError
  >;
  let expectedResult:
    | ResponseBase<{ id: string }>
    | EmailAlreadyExistError
    | NicknameAlreadyExistError;
  let createUserProps: CreateLocalUserProps;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateLocalUserController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateLocalUserController>(
      CreateLocalUserController,
    );
    commandBus = module.get<CommandBus>(CommandBus);

    createUserProps = typia.random<CreateLocalUserProps>();
  });

  it('0. Command must be created', () => {
    const command = new CreateLocalUserCommand(createUserProps);
    expect(typia.is<CreateLocalUserCommand>(command)).toBeTruthy();
  });

  it('1. Should create a new user', async () => {
    commandResult = Ok('user_id'); // Replace with the expected command result
    expectedResult = match(commandResult, {
      Ok: (id: string) => new ResponseBase({ id }),
    });
    jest.spyOn(commandBus, 'execute').mockResolvedValue(commandResult);
    const result = await controller.create(createUserProps);
    expect(result).toEqual(expectedResult);
  });

  it('2. Should handle email already exists throw error ', async () => {
    commandResult = Err(new EmailAlreadyExistError());
    jest.spyOn(commandBus, 'execute').mockResolvedValue(commandResult);
    try {
      match(commandResult, {
        Err: (error: EmailAlreadyExistError) => {
          throw error;
        },
      });
    } catch (err: any) {
      expectedResult = err;
      return;
    }
    const result = await controller.create(createUserProps);
    expect(result).toEqual(expectedResult);
  });
  it('3. Should handle nickname already exists throw error', async () => {
    commandResult = Err(new NicknameAlreadyExistError());
    try {
      match(commandResult, {
        Err: (error: NicknameAlreadyExistError) => {
          throw error;
        },
      });
    } catch (err: any) {
      expectedResult = err;
      return;
    }
    jest.spyOn(commandBus, 'execute').mockResolvedValue(commandResult);
    try {
      await controller.create(createUserProps);
    } catch (err) {
      expect(err).toEqual(expectedResult);
    }
  });
});
