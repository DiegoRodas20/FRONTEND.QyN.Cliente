import { ReplaySubject, Observable } from 'rxjs';

/**
 * Storage service
 * used for persist application data in observable key value pair
 */

export class StorageService {

    private storage: Storage;
    private subjects: Map<string, ReplaySubject<any>>;

    /**
     * Constructor with service injection
     * @param storage 
     */
    constructor(storage: Storage) {
        this.storage = storage;
        this.subjects = new Map<string, ReplaySubject<any>>();
    }

    /**
    * watch data of given key
    * @param key 
    * @param defaultValue 
    */
    watch(key: string): Observable<any> {
        if (!this.subjects.has(key)) {
            this.subjects.set(key, new ReplaySubject<any>(null));
        }
        var item = this.storage.getItem(key);
        if (item === "undefined") {
            item = undefined;
        } else {
            item = JSON.parse(item);
        }
        this.subjects.get(key).next(item);
        return this.subjects.get(key).asObservable();
    }

    /**
     * get data of given key
     * @param key 
     */
    get(key: string): any {
        var item = this.storage.getItem(key);
        if (item === "undefined") {
            item = undefined;
        } else {
            item = JSON.parse(item);
        }
        return item;
    }

    /**
     * set value on given key
     * @param key 
     * @param value 
     */
    set(key: string, value: any) {
        this.storage.setItem(key, JSON.stringify(value));
        if (!this.subjects.has(key)) {
            this.subjects.set(key, new ReplaySubject<any>(value));
        } else {
            this.subjects.get(key).next(value);
        }
    }

    /**
    * remove given key
    * @param key 
    */
    remove(key: string) {
        if (this.subjects.has(key)) {
            this.subjects.get(key).complete();
            this.subjects.delete(key);
        }
        this.storage.removeItem(key);
    }

    /**
     * clear all available keys
     */
    clear() {
        this.subjects.clear();
        this.storage.clear();
    }
}