import { ExceptionBase } from '@src/libs/exceptions/exception.base';

export class EmailAlreadyExistError extends ExceptionBase {
  static readonly message = '이메일이 이미 존재합니다.';

  static readonly businessCode = 1001;
  public readonly code = 'USER.EMAIL_ALREADY_EXIST';

  constructor(cause?: Error) {
    super(
      EmailAlreadyExistError.message,
      EmailAlreadyExistError.businessCode,
      cause,
    );
  }
}

export class NicknameAlreadyExistError extends ExceptionBase {
  static readonly message = '닉네임이 중복입니다.';

  static readonly businessCode = 1002;
  public readonly code = 'USER.NICKNAME_ALREADY_EXIST';

  constructor(cause?: Error) {
    super(
      NicknameAlreadyExistError.message,
      NicknameAlreadyExistError.businessCode,
      cause,
    );
  }
}
