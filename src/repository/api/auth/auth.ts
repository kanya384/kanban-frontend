import axios from "axios";
import { AuthInterface, SignInRequest, SignInResponse } from "../../../useCase/authorization/adapters/api/Interface";
import { AuthApi, Configuration } from "../generated";

export class Auth implements AuthInterface {
    private service: AuthApi;

    constructor () {
        this.service = new AuthApi(new Configuration(), process.env.REACT_APP_BACKEND_URL)
    }

    async SignIn(params: SignInRequest): Promise<SignInResponse | Error> {
        try {
            let response = await this.service.apiAuthSignInPost({
                login: params.login,
                pass: params.pass
            })

            if (response.status === 200) {
                return {
                    token: response.data.token?response.data.token:"",
                    refreshToken:  response.data.refreshToken?response.data.refreshToken:"",
                }
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