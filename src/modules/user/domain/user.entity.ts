import { randomId } from '@src/utils/random-id';
import { CreateLocalUserProps } from './user.type';
import { AggregateId, AggregateRoot } from '@src/libs/ddd/aggregate-root-base';
import { hashingPassword } from '@src/utils/hash-password';
import { SendVertificationEmailDomainEvent } from './events/send-vertification-email.domain-event';
import { SaveTemporalRegisterDataDomainEvent } from './events/save-temporal-register-data.domain-event';
import { randomCode } from '@src/utils/random-code';

export class UserEntity extends AggregateRoot<CreateLocalUserProps> {
  protected readonly _id: AggregateId;
  static create(createProps: CreateLocalUserProps): UserEntity {
    const id = randomId();
    createProps.password = hashingPassword(createProps.password);
    const user = new UserEntity({ id, props: createProps });
    const vertificationRedirectUrl = randomCode();
    user.addEvent(
      new SendVertificationEmailDomainEvent({
        aggregatedId: id,
        email: createProps.email,
        redirectUrl: vertificationRedirectUrl,
      }),
    );
    user.addEvent(
      new SaveTemporalRegisterDataDomainEvent({
        aggregatedId: id,
        data: createProps,
        key: vertificationRedirectUrl,
      }),
    );
    return user;
  }
}
