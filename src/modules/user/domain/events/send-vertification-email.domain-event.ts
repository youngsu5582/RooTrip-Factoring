import { DomainEvent, DomainEventProps } from '@src/libs/ddd/domain-event-base';

export class SendVertificationEmailDomainEvent extends DomainEvent {
  readonly email: string;
  readonly redirectCode: string;
  readonly nickname : string;
  constructor(props: DomainEventProps<SendVertificationEmailDomainEvent>) {
    super(props);
    this.email = props.email;
    this.redirectCode = props.redirectCode;
    this.nickname = props.nickname;
  }
}
