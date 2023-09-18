import { RequestContext } from 'nestjs-request-context';
import AppRequestContext from './app-request-context';

export class RequestContextService {
  static getContext(): AppRequestContext {
    const ctx: AppRequestContext = RequestContext.currentContext.req;
    return ctx;
  }
  static getRequest() {
    return RequestContext.currentContext.req;
  }
  static getRequestId(): string {
    return this.getContext().requestId;
  }
  static setRequestId(id: string): void {
    const ctx: AppRequestContext = RequestContext.currentContext.req;
    ctx.requestId = id;
  }
}
