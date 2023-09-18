export class ResponseBase<T> {
  status: boolean;
  message?: string;
  data: T;
  constructor(data: T) {
    this.status = true;
    this.data = data;
  }
}
