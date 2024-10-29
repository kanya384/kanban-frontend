import axios from "axios";
import { Configuration, DefaultApi } from "../generated";
import { Task } from "../../domain/task";
import { toDomainTask } from "../dto";

export class TasksRepository {
    private service: DefaultApi;

    constructor() {
        this.service = new DefaultApi(new Configuration(), "")
    }

    async ReadTaskById(id: number): Promise<Task | Error> {
        try {
            let response = await this.service.findTaskById(id, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 200) {
               return toDomainTask(response.data)

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

    async CreateTask(statusId: number, title: string, content: string): Promise<Task | Error> {
        try {
            let response = await this.service.create1({statusId: statusId, title: title, content: content}, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 201) {
               return toDomainTask(response.data)

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

    async UpdateTask(id: number, title: string, content: string): Promise<Task | Error> {
        try {
            let response = await this.service.update(id, {title: title, content: content}, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 200) {
               return toDomainTask(response.data)

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

    async ChangeStatus(id: number, statusId: number): Promise<Task | Error> {
        try {
            let response = await this.service.changeStatus(id, statusId, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

            if (response.status === 200) {
               return toDomainTask(response.data)

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

    async DeleteTask(id: number): Promise<string | Error> {
        try {
            let response = await this.service._delete(id, { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

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