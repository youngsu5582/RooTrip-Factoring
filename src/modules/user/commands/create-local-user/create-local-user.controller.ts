import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { ResponseBase } from '@src/libs/api/response.base';
import { CreateLocalUserProps } from '../../domain/user.type';
import { CreateLocalUserCommand } from './create-local-user.command';
import {
  EmailAlreadyExistError,
  NicknameAlreadyExistError,
} from '../../domain/user.error';

@Controller('auth/register')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}
  /**
   * 사용자 회원가입 기능
   *
   * Body 를 통해 받은 createUserProps( email , nickname , name , password )를 통해 User 를 만든다.
   *
   * @tag user
   * @param createUserProps
   * @returns
   */
  @TypedRoute.Post('')
  async create(
    @TypedBody() createLocalUserProps: CreateLocalUserProps,
  ): Promise<
    | ResponseBase<{ id: string }>
    | EmailAlreadyExistError
    | NicknameAlreadyExistError
  > {
    const command = new CreateLocalUserCommand(createLocalUserProps);
    const result: Result<
      string,
      EmailAlreadyExistError | NicknameAlreadyExistError
    > = await this.commandBus.execute(command);
    return match(result, {
      Ok: (id: string) => new ResponseBase({ id }),
      Err: (error: EmailAlreadyExistError | NicknameAlreadyExistError) => {
        throw error;
      },
    });
  }
}
