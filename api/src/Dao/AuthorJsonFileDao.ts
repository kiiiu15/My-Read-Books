import { JsonFileUtils } from '../Utils/JsonFileUtils';
import { Constants } from '../Config/Constants';
import { Comparators } from '../Utils/Comparators';
import { Author } from '../Domain/Author';
import { AuthorDao } from '../Interfaces/AuthorDao';

export class AuthorJsonFileDao implements AuthorDao {

    private fileUtils: JsonFileUtils = JsonFileUtils.getIntance();
    private data: Array<Author> = [];


    constructor() { };

    async add(obj: Author): Promise<Author> {
        try {
            await this.retrieveData();
            this.data.push(obj);
            await this.saveData();
            return Promise.resolve(obj);
        } catch (error) {
            return Promise.reject(error);
        }

    }
    async update(obj: Author): Promise<Author> {
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
    async delete(obj: Author): Promise<void> {
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


    async getAll(): Promise<Author[]> {
        try {
            await this.retrieveData();
            return Promise.resolve(this.data); 3
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getById(id: number): Promise<Author> {

        try {
            await this.retrieveData();
            const author = (this.data.find((author: Author) => author.getId() == id));
            if (!author) {
                throw new Error("Resource Not Found!");
            }
            return Promise.resolve(author);
        } catch (error) {
            return Promise.reject(error);
        }

    }

    private async retrieveData() {

        try {
            const json: string = await this.fileUtils.readFile(Constants.authorFile);
            const data:Array<any> = JSON.parse(json);
            this.data = data.map(this.map);
        } catch (error) {
            console.error(error);
            this.data = [];
        }


    }

    private map(obj: { id: number; name: string; }): Author {
        return new Author(obj.id, obj.name);
    }


    private async saveData() {
        const data = JSON.stringify(this.data, undefined, 2);
        return this.fileUtils.writeFile(Constants.authorFile, data);
    }

}