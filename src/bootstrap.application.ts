import { NestExpressApplication } from '@nestjs/platform-express';
import { EventEmitter } from 'events';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { useSwagger } from './middleware/use-swagger.middleware';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
export class NestBootStrapApplication extends EventEmitter {
  private static INSTANCE: NestBootStrapApplication;
  private static PORT = process.env.PORT || 8000;
  private static LOGGER: Logger = new Logger(NestBootStrapApplication.name);
  private static readonly CORS_WHITELIST = `http://localhost:3000`; // Dev 단계 LIST
  private static readonly PRODUCTION_HOST = process.env.SERVER_URL; // Production 단계 HOST
  private _application: NestExpressApplication;

  private constructor() {
    super();

    this.on('ready', () => {
      this.prepare().start();
    });
    this.on('debug', (message: string) => {
      NestBootStrapApplication.LOGGER.verbose(message); // 가장 상세 로그 레벨
    });
  }

  /**
   * NODE_ENV 값에 따른 서버 시작
   */
  private async start() {
    if (this.isDevelopment()) {
      this.emit('debug', 'Development Server Start');
    }
    this._application = await NestFactory.create<NestExpressApplication>(
      AppModule,
      {},
    );
    this.initMiddleware(this._application);
    this._application.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'RooTripClient',
          brokers: ['localhost:9094'],
        },
      },
    });
    this._application.startAllMicroservices();
    await this._application.listen(NestBootStrapApplication.PORT);
  }
  /**
   * 서버 시작 전 Error Handling Logic 추가
   */
  public prepare() {
    process.on('uncaughtException', (err) => {
      NestBootStrapApplication.LOGGER.error(err);
    });
    process.on('unhandledRejection', (err) => {
      NestBootStrapApplication.LOGGER.error(err);
    });
    return this;
  }

  /**
   * 허용 Domain 이 아닌 , 다른 Domain 에서 요청이 올 시 , 요청 거부
   *
   * @param app
   */
  private useCors(app: NestExpressApplication) {
    const whitelist = this.isDevelopment()
      ? [NestBootStrapApplication.CORS_WHITELIST, 'http://localhost:8000']
      : [NestBootStrapApplication.PRODUCTION_HOST];
    app.enableCors({
      origin: this.isDevelopment()
        ? '*'
        : (origin, callback) => {
            if (!origin || whitelist.indexOf(origin) !== -1)
              callback(null, true);
            else callback(new Error('Not Allowed by CORS'));
          },
      credentials: true,
    });
  }

  /**
   * 사용하는 Middleware 들 초기화
   * @param app
   */
  private initMiddleware(app: NestExpressApplication) {
    this.useCors(app);
    useSwagger(app);
  }

  /**
   * NODE_ENV 의 값을 확인후 true/false return
   *
   * @returns boolean
   */
  private isDevelopment() {
    if (!process.env.NODE_ENV) return true;
    return process.env.NODE_ENV === 'development';
  }

  /**
   * Singleton Pattern 을 준수하기 위해 INSTANCE 가 없을때만 return
   *
   * @returns NestBootStrapApplication
   */
  public static getInstance() {
    if (!NestBootStrapApplication.INSTANCE) {
      NestBootStrapApplication.INSTANCE = new NestBootStrapApplication();
    }
    return NestBootStrapApplication.INSTANCE;
  }
}
