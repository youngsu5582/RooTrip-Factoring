import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendVertificationPayload } from '@src/types';

@Injectable()
export class EmailerProvider {
  private readonly _verifySubject = 'RooTrip 이메일 인증';
  private readonly _serverUrl: string;
  constructor(private readonly mailerService: MailerService) {
    this._serverUrl = 'http://localhost:8000';
  }

  sendVertification(payload: SendVertificationPayload) {
    const result = this.mailerService.sendMail({
      from: 'RooTripEmail@gmail.com',
      to: payload.email,
      subject: this._verifySubject,
      html: `<h3>밑에 사이트를 클릭해서 회원가입을 완료해주세요\n</h3>
      <h5>${this._serverUrl}/auth/verify/callback?code=${payload.code}</h5>`,
    });
    result.then((data) => data);
    result.catch((err) => {
      throw err;
    });
  }
}
