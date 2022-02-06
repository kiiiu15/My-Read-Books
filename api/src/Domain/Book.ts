import { Author } from "./Author";

export class Book implements IModel{
    constructor(
        private id: number,
        private name: string,
        private description: string,
        private author: Author
    ) { }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getAuthor(): Author {
        return this.author;
    }

    public setAuthor(author: Author): void {
        this.author = author;
    }

}