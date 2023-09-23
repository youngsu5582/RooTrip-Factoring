import { DomainEvent, DomainEventProps } from '@src/libs/ddd/domain-event-base';

export class SendVertificationEmailDomainEvent extends DomainEvent {
  readonly email: string;
  readonly redirectUrl: string;
  constructor(props: DomainEventProps<SendVertificationEmailDomainEvent>) {
    super(props);
    this.email = props.email;
    this.redirectUrl = props.redirectUrl;
  }
}
