export interface Dao <T> {
    add(obj:T):Promise<T>;
    update(obj:T):Promise<T>;
    delete(obj:T):Promise<void>;
    deleteById(id:number): Promise<void>;
    getAll():Promise<Array<T>>;
    getById(id:number):Promise<T>;
}