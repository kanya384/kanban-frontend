import { UsersRepository } from "../../repository/api/user/user";
import { actionCreators } from "../../state";

export class UserUseCases {
    private api: UsersRepository;
    private stateActions: typeof actionCreators;

    constructor(api: UsersRepository, stateActions: typeof actionCreators) {
        this.api = api;
        this.stateActions = stateActions;
    }

    public ReadUsers = async () => {
        this.stateActions.SendUserListRequest()
        let response = await this.api.ReadUsers()
        if (response instanceof Error) {
            this.stateActions.UserListError(response.message)
            return
        } else {
            this.stateActions.UserListSuccess(response)
        }
    }

    public DeleteUser = async (id: number) => {
        this.stateActions.UserDeleteRequest()
        let response = await this.api.DeleteUser(id)
        if (response instanceof Error) {
            this.stateActions.UserDeleteError(response.message)
            return
        } else {
            this.stateActions.UserDeleteSuccess(id)
        }
    }

    public ReadUserById = async (id: UniqueId) => {
        let response = await this.api.ReadUserById(id)
        return response
    }

    public CreateUser = async (id: number, name: string, surname: string, login: string, pass: string, role: string, enabled: boolean, deputy: number[], callback?: ()=>void) => {
        this.stateActions.UserCreateRequest()
        let response = await this.api.CreateUser(id, name, surname, login, pass, role, enabled, deputy)
        if (response instanceof Error) {
            this.stateActions.UserCreateError(response.message)
            return
        } else {
            this.stateActions.UserCreateSuccess(response)
            if (callback) {
                callback()
            }
        }
    }

    public UpdateUser = async (id: UniqueId, name: string, surname: string, login: string, role: string, enabled: boolean, deputy: number[], callback?: ()=>void) => {
        this.stateActions.UserUpdateRequest()
        let response = await this.api.UpdateUser(id, name, surname, login, role, enabled, deputy)
        if (response instanceof Error) {
            this.stateActions.UserUpdateError(response.message)
            return
        } else {
            this.stateActions.UserUpdateSuccess(response)
            if (callback) {
                callback()
            }
        }
    }

    public ChangePassword = async (id: UniqueId, pass: string, callback?: ()=>void) => {
        this.stateActions.UserUpdateRequest()
        let response = await this.api.ChangePassword(id, pass)
        if (response instanceof Error) {
            this.stateActions.UserUpdateError(response.message)
            return
        } else {
            this.stateActions.UserUpdateSuccess(response)
            if (callback) {
                callback()
            }
        }
    }

}