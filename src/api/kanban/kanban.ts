import axios from "axios";
import { Configuration, DefaultApi } from "../generated";
import { Kanban } from "../../domain/kanban";
import { toDomainKanbansFromList, toDomainKanban } from "../dto";

export class KanbansRepository {
    private service: DefaultApi;

    constructor() {
        this.service = new DefaultApi(new Configuration(), "")
    }

    async ReadKanbanById(id: number): Promise<Kanban | Error> {
        try {
            let response = await this.service.findKanbanById(id, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 200) {
               return toDomainKanban(response.data)

            }
        } catch (e) {
            console.log(e)
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.error
            }

            return Error(error)
        }

        return Error("something's gone wrong")
    }
    
    async ReadKanbansOfUser(): Promise<Kanban[] | Error> {
        try {
            let response = await this.service.findAllCollaboratedByUserKanbans({ headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

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

    async CreateKanban(title: string): Promise<Kanban | Error> {
        try {
            let response = await this.service.create4({title: title}, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 201) {
               return toDomainKanban(response.data)

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

    async UpdateKanban(id: number, title: string): Promise<Kanban | Error> {
        try {
            let response = await this.service.update2(id, {title: title}, { headers: { "Authorization": localStorage.getItem("token") } })

            if (response.status === 200) {
               return toDomainKanban(response.data)

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

    async DeleteKanban(id: number): Promise<string | Error> {
        try {
            let response = await this.service.delete2(id, { headers: { "Authorization": localStorage.getItem("token") } })

            if (response.status === 204) {
               return "ok"

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