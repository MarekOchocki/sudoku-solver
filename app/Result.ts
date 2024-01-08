
export interface CorrectResult<T, E> {
  getValue(): T;
  isOk(): this is CorrectResult<T, E>;
  isError(): this is ErrorResult<T, E>;
}

export interface ErrorResult<T, E> {
  getError(): E;
  isOk(): this is CorrectResult<T, E>;
  isError(): this is ErrorResult<T, E>;
}

export type UncheckedResult<T, E> = CorrectResult<T, E> | ErrorResult<T, E>;

class ResultImpl<T, E> implements CorrectResult<T, E>, ErrorResult<T, E> {

  public constructor(private valueOrError: T | E | undefined, private _isOk: boolean) { }

  isOk(): this is CorrectResult<T, E> {
    return this._isOk;
  }

  isError(): this is ErrorResult<T, E> {
    return !this._isOk;
  }

  getValue(): T {
    return this.valueOrError as T;
  }

  getError(): E {
    return this.valueOrError as E;
  }
}

export class Result {
  static ok<T>(value: T): CorrectResult<T, any> {
    return new ResultImpl<T, any>(value, true);
  }

  static error<E>(error: E): ErrorResult<any, E> {
    return new ResultImpl<any, E>(error, false);
  }
}
