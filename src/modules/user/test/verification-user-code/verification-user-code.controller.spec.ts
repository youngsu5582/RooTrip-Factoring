import { CommandBus } from '@nestjs/cqrs';
import { VerificationUserCodeController } from '../../commands/verification-user-code/verification-user-code.controller';
import { Err, Ok, Result, match } from 'oxide.ts';
import {
  CodeNotExistError,
  EmailAlreadyExistError,
  NicknameAlreadyExistError,
} from '../../domain/user.error';
import { Test, TestingModule } from '@nestjs/testing';
import { VerificationUserCodeProps } from '../../domain/user.type';
import typia from 'typia';
import { ResponseBase } from '@src/libs/api/response.base';

describe('VerificationUserCodeController', () => {
  let controller: VerificationUserCodeController;
  let commandBus: CommandBus;
  let commandResult: Result<
    undefined,
    CodeNotExistError | NicknameAlreadyExistError | EmailAlreadyExistError
  >;
  let expectedResult: ResponseBase<undefined> | CodeNotExistError;
  let props: VerificationUserCodeProps;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificationUserCodeController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<VerificationUserCodeController>(
      VerificationUserCodeController,
    );
    commandBus = module.get<CommandBus>(CommandBus);
    props = typia.random<VerificationUserCodeProps>();
  });

  it('1. should create user record , profile record', async () => {
    commandResult = Ok(undefined);
    expectedResult = match(commandResult, {
      Ok: () => new ResponseBase(),
    });
    jest.spyOn(commandBus, 'execute').mockResolvedValue(commandResult);
    const result = await controller.verify(props);
    expect(result).toEqual(expectedResult);
  });
  it('2. Not Exist Code , should throw error', async () => {
    commandResult = Err(new CodeNotExistError());
    jest.spyOn(commandBus, 'execute').mockResolvedValue(commandResult);
    try {
      match(commandResult, {
        Err: (error: CodeNotExistError) => {
          throw error;
        },
      });
    } catch (err: any) {
      expectedResult = err;
      return;
    }
    const result = await controller.verify(props);
    expect(result).toEqual(expectedResult);
  });
  it('3. Should handle email already exists throw error ', async () => {
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

    const result = await controller.verify(props);
    expect(result).toEqual(expectedResult);
  });
  it('4. Should handle nickname already exists throw error', async () => {
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
      await controller.verify(props);
    } catch (err) {
      expect(err).toEqual(expectedResult);
    }
  });
});
