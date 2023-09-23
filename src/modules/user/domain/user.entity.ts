import { randomId } from '@src/utils/random-id';
import { CreateLocalUserProps } from './user.type';
import { AggregateId, AggregateRoot } from '@src/libs/ddd/aggregate-root-base';
import { UserCreatedDomainEvent } from './events/user-created.domain-event';
import { hashingPassword } from '@src/utils/hash-password';

export class UserEntity extends AggregateRoot<CreateLocalUserProps> {
  protected readonly _id: AggregateId;
  static create(createProps: CreateLocalUserProps): UserEntity {
    const id = randomId();
    const user = new UserEntity({ id, props: createProps });
    const encryptPassword = hashingPassword(createProps.password);
    user.addEvent(
      new UserCreatedDomainEvent({
        aggregatedId: id,
        data: { ...createProps, password: encryptPassword },
      }),
    );
    return user;
  }
}
