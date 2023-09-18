import { RequestContext } from 'nestjs-request-context';

export default class AppRequestContext extends RequestContext {
  requestId: string;
}
