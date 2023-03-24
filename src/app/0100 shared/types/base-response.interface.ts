export class BaseResponseInterface<T> {
    createdAt: number | null = null;
    isSuccess: boolean = false;
    message: string | null = null;
    data: T | null = null;

    static isBaseResponseInterface<T>(obj: any): obj is BaseResponseInterface<T> {
         return typeof obj.createdAt === 'number'
        && typeof obj.success === 'boolean'
        && (typeof obj.message === 'string' || obj.message === null)
        && (typeof obj.data === 'object' || obj.message === null);
    }
  }


