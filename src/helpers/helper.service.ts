export class HelperService {
    public static callbackToPromise(func: (...args) => void, args: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            func(...args, (...results) => {
                resolve(...results);
            });
        });
    }
}
