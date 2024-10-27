import axios from "axios";
/*import { User } from "../../../domain/user/user";
import { Configuration, UsersApi } from "../generated";
import { UsersInterface } from "../../../useCase/users/adapters/interface";

export class UsersRepository implements UsersInterface {
    private service: UsersApi;

    constructor() {
        this.service = new UsersApi(new Configuration(), process.env.REACT_APP_BACKEND_URL)
    }

    async ReadUserById(id: UniqueId): Promise<User | Error> {
        try {
            let response = await this.service.apiUserIdGet(id, { headers: { "Authorization": localStorage.getItem("token") } })

            if (response.status === 200) {
                let createdAt = new Date(response.data.created_at!)
                let modifiedAt = new Date(response.data.modified_at!)


                let user = new User(response.data.id!, response.data.name!, response.data.surname!, response.data.login!, response.data.pass!, response.data.role!, response.data.enabled!, response.data.deputy!, createdAt, modifiedAt)
                return user

            }
        } catch (e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.message
            }

            return Error("error authorization")
        }

        return Error("error authorization")
    }
    
    async ReadUsers(): Promise<User[] | Error> {
        try {
            let response = await this.service.apiUserGet({ headers: { "Authorization": localStorage.getItem("token") } })

            if (response.status === 200) {
                let users: User[] = []
                response.data.forEach(userData => {
                    let createdAt = new Date(userData.created_at!)
                    let modifiedAt = new Date(userData.modified_at!)

                    let user = new User(userData.id!, userData.name!, userData.surname!, userData.login!, userData.pass!, userData.role!, userData.enabled!, userData.deputy!, createdAt, modifiedAt)
                    users.push(user)
                });
                return users
            }
        } catch (e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.message
            }

            return Error("error authorization")
        }

        return Error("error authorization")
    }

    async DeleteUser(id: number): Promise<string | Error> {
        try {
            let response = await this.service.apiUserIdDelete(id.toString(), { headers: { "Authorization": localStorage.getItem("token") } })

            if (response.status === 200) {
                return "success"
            }
        } catch(e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.message
            }
            
            return Error("error authorization")
        }
        
        return Error("error authorization")
    }

    async CreateUser(id: number, name: string, surname: string, login: string, pass: string, role: string, enabled: boolean, deputy: number[]): Promise<User | Error> {
        try {
            let response = await this.service.apiUserPost({id: id, name: name, surname: surname, login: login, pass: pass, role: role, enabled: enabled, deputy: deputy}, { headers: { "Authorization": localStorage.getItem("token") } })

            if (response.status === 200) {
                let createdAt = new Date(response.data.created_at!)
                let modifiedAt = new Date(response.data.modified_at!)
                let user = new User(response.data.id!, response.data.name!, response.data.surname!, response.data.login!, response.data.pass!, response.data.role!, response.data.enabled!, response.data.deputy!, createdAt, modifiedAt)
                return user
            }
        } catch(e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.message
            }
            
            return Error("error authorization")
        }
        
        return Error("error authorization")
    }

    async UpdateUser(id: UniqueId, name: string, surname: string, login: string, role: string, enabled: boolean, deputy: number[],): Promise<User | Error> {
        try {
            let response = await this.service.apiUserIdPut(id, {name: name, surname: surname, login: login, role: role, enabled: enabled, deputy: deputy}, { headers: { "Authorization": localStorage.getItem("token") } })

            if (response.status === 200) {
                let createdAt = new Date(response.data.created_at!)
                let modifiedAt = new Date(response.data.modified_at!)
                let user = new User(response.data.id!, response.data.name!, response.data.surname!, response.data.login!, response.data.pass!, response.data.role!, response.data.enabled!, response.data.deputy!, createdAt, modifiedAt)
                return user
            }
        } catch(e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.message
            }
            
            return Error("error authorization")
        }
        
        return Error("error authorization")
    }

    async ChangePassword(id: UniqueId, pass: string): Promise<User | Error> {
        try {
            let response = await this.service.apiUserIdPasswordPut(id, {password: pass}, { headers: { "Authorization": localStorage.getItem("token") } })

            if (response.status === 200) {
                let createdAt = new Date(response.data.created_at!)
                let modifiedAt = new Date(response.data.modified_at!)
                let user = new User(response.data.id!, response.data.name!, response.data.surname!, response.data.login!, response.data.pass!, response.data.role!, response.data.enabled!, response.data.deputy!, createdAt, modifiedAt)
                return user
            }
        } catch(e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.message
            }
            
            return Error("error authorization")
        }
        
        return Error("error authorization")
    }

}
    */