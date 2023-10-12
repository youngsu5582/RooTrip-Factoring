import { DomainEvent, DomainEventProps } from '@src/libs/ddd/domain-event-base';

export class DeleteTemporalRegisterDataDomainEvent extends DomainEvent {
  readonly key: string;
  constructor(props: DomainEventProps<DeleteTemporalRegisterDataDomainEvent>) {
    super(props);
    this.key = props.key;
  }
}
