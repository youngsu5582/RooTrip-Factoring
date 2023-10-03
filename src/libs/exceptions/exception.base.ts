import { RequestContextService } from '../application/context/request-context.service';

export interface SerializedException {
  message: string;
  code: string;
  correlationId?: string;
  businessCode: number;
  stack?: string;
  cause?: string;
  metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
  abstract code: string;
  public readonly correlationId?: string;
  constructor(
    readonly message: string,
    readonly businessCode: number,
    readonly cause?: Error,
    readonly metadata?: unknown,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    const ctx = RequestContextService.getContext();
    this.correlationId = ctx?.requestId;
  }
  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      businessCode: this.businessCode,
      correlationId: this.correlationId,
      metadata: this.metadata,
      cause: JSON.stringify(this.cause),
    };
  }
}
