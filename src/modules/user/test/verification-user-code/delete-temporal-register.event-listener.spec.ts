import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTemporalRegisterDataDomainEvent } from '../../domain/events/delete-temporal-register-data.domain-event';
import { DeleteTemporalRegisterDataEventListener } from '../../listeners/delete-temporal-register.event-listener';
import typia from 'typia';
import { DomainEventProps } from '@src/libs/ddd/domain-event-base';
import { RedisModule } from '@src/providers/redis/redis.module';
import { RedisProvider } from '@src/providers/redis/redis.provider';

describe('DeleteTemporalRegisterDataEventListener', () => {
  let listener: DeleteTemporalRegisterDataEventListener;
  let provider: RedisProvider;
  let event: DeleteTemporalRegisterDataDomainEvent;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [RedisProvider, DeleteTemporalRegisterDataEventListener],
    }).compile();
    listener = module.get<DeleteTemporalRegisterDataEventListener>(
      DeleteTemporalRegisterDataEventListener,
    );
    provider = module.get<RedisProvider>(RedisProvider);
    event = new DeleteTemporalRegisterDataDomainEvent(
      typia.random<DomainEventProps<DeleteTemporalRegisterDataDomainEvent>>(),
    );
  });
  it('should validate event', () => {
    expect(event).toBeInstanceOf(DeleteTemporalRegisterDataDomainEvent);
  });
  it('should delete temporal data for used save user entity , profile entity', () => {
    jest.spyOn(provider, 'delData').mockResolvedValue(typia.random<number>());
    listener.handleSaveTemporalRegisterDataEvent(event);
    expect(provider.delData).toHaveBeenCalledTimes(0);
  });
});
