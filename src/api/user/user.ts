import axios from "axios";
import { Configuration, DefaultApi } from "../generated";
import { User } from "../../domain/user";
import { toDomainKanbansFromList, toDomainUser } from "../dto";
import { Kanban } from "../../domain/kanban";

export class UsersRepository {
    private service: DefaultApi;

    constructor() {
        this.service = new DefaultApi(new Configuration(), "")
    }

    async ReadUserById(id: number): Promise<User | Error> {
        try {
            let response = await this.service.findUserById(id, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 200) {
               return toDomainUser(response.data)

            }
        } catch (e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.error
            }

            return Error(error)
        }

        return Error("something's gone wrong")
    }
    
    async ReadUsersKanbans(userId: number): Promise<Kanban[] | Error> {
        try {
            let response = await this.service.findUsersKanbans(userId, {headers: { "Authorization": localStorage.getItem("token") } })

            if (response.status === 200) {
                
                return toDomainKanbansFromList(response.data!);
            }
        } catch (e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.error
            }

            return Error(error)
        }

        return Error("something's gone wrong")
    }

}