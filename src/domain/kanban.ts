import { Status } from "./status";
import { User } from "./user";

export class Kanban {
    private id: number;
    private title: string;
    private statuses: Status[];
    private createdAt: Date;
    private updatedAt: Date;

    constructor(id: number, title: string, statuses: Status[], createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.statuses = statuses;
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

    public getStatuses(): Status[] {
        return this.statuses;
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

    public setStatuses(statuses: Status[]): void {
        this.statuses = statuses;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }


}