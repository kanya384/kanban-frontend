import { AuthApi } from "../../repository/api/auth/auth";
import { actionCreators } from "../../state";
import { AuthStorage } from "../../storage/auth";
import { AuthStorageInterface } from "./adapters/storage/storage";
import jwtDecode from "jwt-decode";

export class AuthorizationUseCases {
    private api: AuthApi;
    private stateActions: typeof actionCreators;
    private storage: AuthStorageInterface;

    constructor(api: AuthApi, stateActions: typeof actionCreators) {
        this.api = api;
        this.stateActions = stateActions;
        this.storage = new AuthStorage();

    }

    public SignIn = async (login: Login, pass: Pass) => {
        this.stateActions.SendLoginRequest()
        let response = await this.api.SignIn(login, pass)
        if (!(response instanceof Error)) {
            this.storage.SaveToken(response)
            this.stateActions.LoginSuccess()
        } else {
            let error = "Ошибка: Проверьте email и пароль"
            this.stateActions.LoginError(error)
        }
    }

    public Registration = async (name: string, email: string, pass: string) => {
        let response = await this.api.Registration(name, email, pass)
        return response;
    }

    public CheckAuthorization = () => {
        let token = this.storage.ReadToken()
        if (token) {
            let decoded = jwtDecode<{ exp: number }>(token)
            let currentDate = new Date();
            if (decoded.exp * 1000 < currentDate.getTime()) {
                this.stateActions.LoginError("")
            } else {
                this.stateActions.LoginSuccess()
            }
        } else {
            this.stateActions.LoginError("")
        }

    }

    

    public UserId = () => {
        let token = this.storage.ReadToken()
        if (token) {
            let decoded = jwtDecode<{user_id: string}>(token)
            
            return parseInt(decoded.user_id)
        } else {
            return 0
        }

    }



    public DecodeToken = () => {
        let token = this.storage.ReadToken()
        if (token) {
            let decoded = jwtDecode<{access_list: string[],}>(token)
            return decoded.access_list
        } else {
            return []
        }

    }

    public LogOut = () => {
        this.storage.DeleteToken()
        this.stateActions.LoginError("")
    }
}