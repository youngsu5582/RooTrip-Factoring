import { TypedQuery, TypedRoute } from '@nestia/core';
import { CommandBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { VerificationUserCodeCommand } from './verification-user-code.command';
import { VerificationUserCodeProps } from '../../domain/user.type';
import { CodeNotExistError } from '../../domain/user.error';
import { Controller } from '@nestjs/common';
import { ResponseBase } from '@src/libs/api/response.base';

@Controller()
export class VerificationUserCodeController {
  constructor(private readonly commadBus: CommandBus) {}

  @TypedRoute.Get('auth/verify/callback')
  async verify(@TypedQuery() props: VerificationUserCodeProps) {
    const command = new VerificationUserCodeCommand(props);
    const result: Result<true, CodeNotExistError> =
      await this.commadBus.execute(command);
    return match(result, {
      Ok: () => new ResponseBase(),
      Err: (error: CodeNotExistError) => {
        throw error;
      },
    });
  }
}
