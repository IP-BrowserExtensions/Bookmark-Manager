export class HelperService {
  public static callbackToPromise(func: (...args: any[]) => void, args: any[]): Promise<any> {
    return new Promise((resolve, _) => {
      func(...args, (...results: any[]) => {
        resolve(...results);
      });
    });
  }
}
