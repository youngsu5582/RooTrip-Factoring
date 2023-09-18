import { randomId } from '@src/utils/random-id';
import { RequestContextService } from '../application/context/request-context.service';

type DomainEventMetaData = {
  readonly timestamp: number;
  readonly correlationId: string;
  readonly causationId?: string;
  readonly userId?: string;
};

export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
  aggregatedId: string;
  metadata?: DomainEventMetaData;
};

export abstract class DomainEvent {
  public readonly id: string;
  public readonly aggregatedId: string;
  public readonly metadata: DomainEventMetaData;

  constructor(props: DomainEventProps<unknown>) {
    this.id = randomId();
    this.aggregatedId = props.aggregatedId;
    this.metadata = {
      correlationId:
        props.metadata?.correlationId || RequestContextService.getRequestId(),
      timestamp: props.metadata?.timestamp || Date.now(),
      causationId: props?.metadata?.causationId,
      userId: props?.metadata?.userId,
    };
  }
}
