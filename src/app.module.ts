import { Module, Provider } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/context.interceptor';
import { ExceptionInterceptor } from './libs/application/interceptors/exception.interceptor';
import { UserModule } from './modules/user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MicroserviceModule } from './modules/microservice/microservice.module';

const interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];
@Module({
  imports: [
    RequestContextModule,
    EventEmitterModule.forRoot({}),
    UserModule,
    MicroserviceModule,
  ],
  controllers: [],
  providers: [...interceptors],
})
export class AppModule {}
