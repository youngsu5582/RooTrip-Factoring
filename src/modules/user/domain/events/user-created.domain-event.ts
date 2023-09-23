import { DomainEvent, DomainEventProps } from '@src/libs/ddd/domain-event-base';
import { CreateLocalUserProps } from '../user.type';

export class UserCreatedDomainEvent extends DomainEvent {
  readonly data: CreateLocalUserProps;
  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.data = props.data;
  }
}
