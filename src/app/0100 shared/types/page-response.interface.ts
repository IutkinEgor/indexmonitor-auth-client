import { BaseResponseInterface } from "./base-response.interface";

export class PageResponseInterface<T> extends BaseResponseInterface<T> {
    totalCount: number | null = null;
    currentPage: number | null = null;
    currentSize: number | null = null;

    static isPageResponseInterface<T>(obj: any): obj is PageResponseInterface<T> {
        return (typeof obj.totalCount === 'number')
        && (typeof obj.currentPage === 'number')
        && (typeof obj.currentSize === 'number')
        && (typeof obj.createdAt === 'number')
        && (typeof obj.success === 'boolean')
        && (typeof obj.message === 'string' || obj.message === null)
        && (typeof obj.data === 'object' || obj.message === null);
   }
}