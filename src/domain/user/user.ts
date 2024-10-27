export class User {
     
    private id: number; 
    private name: string; 
    private surname: string; 
    private login: string; 
    private pass: string; 
    private role: string;
    private enabled: boolean;
    private deputy: number[];
    private createdAt: Date; 
    private modifiedAt: Date;

    constructor( id: number, name: string, surname: string, login: string, pass: string, role: string, enabled: boolean, deputy: number[], createdAt: Date, modifiedAt: Date,) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.pass = pass;
        this.role = role;
        this.deputy = deputy;
        this.enabled = enabled;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        
    }

    
    public Id = (): number => {
        return this.id
    }
    public Name = (): string => {
        return this.name
    }
    public Surname = (): string => {
        return this.surname
    }
    public Login = (): string => {
        return this.login
    }
    public Pass = (): string => {
        return this.pass
    }
    public Role = (): string => {
        return this.role
    }

    public Enabled = (): boolean => {
        return this.enabled
    }

    public Deputy = (): number[] => {
        return this.deputy
    }
    public CreatedAt = (): Date => {
        return this.createdAt
    }
    public ModifiedAt = (): Date => {
        return this.modifiedAt
    }
}