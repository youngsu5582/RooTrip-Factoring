import { DomainEvent, DomainEventProps } from '@src/libs/ddd/domain-event-base';
import { CreateLocalUserProps } from '../user.type';

export class SaveTemporalRegisterDataDomainEvent extends DomainEvent {
  readonly key: string;
  readonly data: CreateLocalUserProps;
  constructor(props: DomainEventProps<SaveTemporalRegisterDataDomainEvent>) {
    super(props);
    this.key = props.key;
    this.data = props.data;
  }
}
