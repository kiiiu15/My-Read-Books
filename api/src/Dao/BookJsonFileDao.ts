import { JsonFileUtils } from '../Utils/JsonFileUtils';
import { Constants } from '../Config/Constants';
import { Comparators } from '../Utils/Comparators';
import { Book } from '../Domain/Book';
import { BookDao } from '../Interfaces/BookDao';
import { Author } from '../Domain/Author';


export class BookJsonFileDao implements BookDao {

    private fileUtils: JsonFileUtils = JsonFileUtils.getIntance();
    private data: Array<Book> = [];


    constructor() { };

    async add(obj: Book): Promise<Book> {
        try {
            await this.retrieveData();
            this.data.push(obj);
            await this.saveData();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }

    }
    async update(obj: Book): Promise<Book> {
        try {
            await this.retrieveData();
            const index = this.data.findIndex(Comparators.compareById(obj));
            this.data.splice(index, 1, obj);
            await this.saveData();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }

    }
    async delete(obj: Book): Promise<void> {
        try {
            await this.retrieveData();
            const index = this.data.findIndex(Comparators.compareById(obj));
            this.data.splice(index, 1);
            await this.saveData();
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }

    };

    async deleteById(id: number): Promise<void> {

        try {
            this.retrieveData();
            const index = this.data.findIndex(Comparators.compareWithId(id));
            this.data.splice(index, 1);
            this.saveData();
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }

    }


    async getAll(): Promise<Book[]> {
        try {
            await this.retrieveData();
            return Promise.resolve(this.data); 3
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getById(id: number): Promise<Book> {

        try {
            await this.retrieveData();
            const Book = (this.data.find((Book: Book) => Book.getId() == id));
            if (!Book) {
                throw new Error("Resource Not Found!");
            }
            return Promise.resolve(Book);
        } catch (error) {
            return Promise.reject(error);
        }

    }

    private async retrieveData() {

        try {
            const json: string = await this.fileUtils.readFile(Constants.bookFile);
            const data:Array<any> = JSON.parse(json);
            this.data = data.map(this.map);
        } catch (error) {
            console.error(error);
            this.data = [];
        }


    }

    private map(obj: { id: number; name: string; description: string; author: Author; }): Book {
        return new Book(obj.id, obj.name, obj.description, obj.author);
    }


    private async saveData() {
        const data = JSON.stringify(this.data, undefined, 2);
        return this.fileUtils.writeFile(Constants.bookFile, data);
    }

}