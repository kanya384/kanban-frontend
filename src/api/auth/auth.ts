import axios from "axios";
import { Configuration, DefaultApi } from "../generated";

export class AuthApi {
    private service: DefaultApi;

    constructor () {
        this.service = new DefaultApi(new Configuration(), "")
    }

    async SignIn(username: string, password: string): Promise<string | Error> {
        try {
            let response = await this.service.create3({
                username: username,
                password: password,
            })

            if (response.status === 200) {
                return response.data
            }
        } catch(e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.error
            }

            return Error(error)
        }
        
        return Error("error authorization")
        
    }

    async Registration(name: string, email: string, password: string): Promise<number | Error> {
        try {
            let response = await this.service.create({
                name: name,
                email: email,
                password: password,
            })

            if (response.status === 201) {
                return response.data.id!
            }
        } catch(e) {
            let error: string = ""
            if (axios.isAxiosError(e)) {
                error = e.response?.data.error
            }
            
            return Error(error)
        }
        
        return Error("error authorization")
    }
}