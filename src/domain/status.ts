import { Kanban } from "./kanban";
import { Task } from "./task";

export class Status {
    private id: number;
    private title: string;
    //private kanban: Kanban;
    private tasks: Task[];
    private createdAt: Date;
    private updatedAt: Date;

    constructor(id: number, title: string, tasks: Task[], createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.tasks = tasks;
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

    public getTasks(): Task[] {
        return this.tasks;
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

    public setTasks(tasks: Task[]): void {
        this.tasks = tasks;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

} 