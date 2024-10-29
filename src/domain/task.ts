import { User } from "./user";

export class Task {
    private id: number; 
    private title: string;
    private content: string;
    private assignee?: User;
    private author: User;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(id: number, title: string, content: string, author: User, createdAt: Date, updatedAt: Date, assignee?: User,) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.assignee = assignee;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }

    public getAssignee(): User | undefined {
        return this.assignee;
    }

    public getAuthor(): User {
        return this.author;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    // Setters
    public setId(id: number): void {
        this.id = id;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public setAssignee(assignee: User): void {
        this.assignee = assignee;
    }

    public setAuthor(author: User): void {
        this.author = author;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

}