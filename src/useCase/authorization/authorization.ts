import { actionCreators } from "../../state";
import { AuthStorage } from "../../storage/auth";
import { AuthInterface } from "./adapters/api/Interface";
import { AuthStorageInterface } from "./adapters/storage/storage";
import jwtDecode from "jwt-decode";

export class AuthorizationUseCases {
    private api: AuthInterface;
    private stateActions: typeof actionCreators;
    private storage: AuthStorageInterface;

    constructor(api: AuthInterface, stateActions: typeof actionCreators) {
        this.api = api;
        this.stateActions = stateActions;
        this.storage = new AuthStorage();

    }

    public SignIn = async (login: Login, pass: Pass) => {
        this.stateActions.SendLoginRequest()
        let response = await this.api.SignIn({ login, pass })
        if (!(response instanceof Error)) {
            this.storage.SaveToken(response.token)
            this.storage.SaveRefreshToken(response.refreshToken)
            this.stateActions.LoginSuccess()
        } else {
            let error = "ошибка авторизации"
            this.stateActions.LoginError(error)
        }
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

    public IsAdminUser = () => {
        let token = this.storage.ReadToken()
        if (token) {
            let decoded = jwtDecode<{role: string}>(token)
            if (decoded.role === "admin") {
                return true
            }
            return false
        } else {
            return false
        }

    }

    public IsModerator = () => {
        let token = this.storage.ReadToken()
        if (token) {
            let decoded = jwtDecode<{role: string}>(token)
            if (decoded.role === "moderator" || decoded.role === "moderator_realist") {
                return true
            }
            return false
        } else {
            return false
        }

    }

    public IsModeratorRealist = () => {
        let token = this.storage.ReadToken()
        if (token) {
            let decoded = jwtDecode<{role: string}>(token)
            if (decoded.role === "moderator_realist") {
                return true
            }
            return false
        } else {
            return false
        }

    }

    public IsManager = () => {
        let token = this.storage.ReadToken()
        if (token) {
            let decoded = jwtDecode<{role: string}>(token)
            if (decoded.role === "manager") {
                return true
            }
            return false
        } else {
            return false
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