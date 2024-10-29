export class User {
    private id: number; 
    private name: string;
    private email: string;
    private createdAt: Date; 
    private updatedAt: Date;

    constructor( id: number, name: string, email: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

     // Getters
     public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdateddAt(): Date {
        return this.updatedAt;
    }

    // Setters
    public setId(id: number): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public setUpdateddAt(modifiedAt: Date): void {
        this.updatedAt = modifiedAt;
    }

    
    
}