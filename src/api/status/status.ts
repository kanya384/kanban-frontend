import axios from "axios";
import { Configuration, DefaultApi } from "../generated";
import { Status } from "../../domain/status";
import { toDomainStatus } from "../dto";

export class StatusesRepository {
    private service: DefaultApi;

    constructor() {
        this.service = new DefaultApi(new Configuration(), "")
    }

    async ReadStatusById(id: number): Promise<Status | Error> {
        try {
            let response = await this.service.findStatusById(id, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 200) {
               return toDomainStatus(response.data)

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

    async CreateStatus(kanbanId: number, title: string): Promise<Status | Error> {
        try {
            let response = await this.service.create2({kanbanId: kanbanId, title: title}, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 201) {
               return toDomainStatus(response.data)

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

    async UpdateStatus(id: number, title: string): Promise<Status | Error> {
        try {
            let response = await this.service.update1(id, {title: title}, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 200) {
               return toDomainStatus(response.data)

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

    async DeleteStatus(id: number): Promise<string | Error> {
        try {
            let response = await this.service.delete1(id, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 204) {
               return "ok"
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
}