import { Auth } from "../repository/api/auth/auth"
import { UsersRepository } from "../repository/api/user/user"
 
import { AuthorizationUseCases } from "../useCase/authorization/authorization"
 
import { UserUseCases } from "../useCase/users/user"


export const useUseCases = (actions:any) => {
    const authUseCase = new AuthorizationUseCases(new Auth(), actions)
    const userUseCase =  new UserUseCases(new UsersRepository(), actions)
    

    return {authUseCase, userUseCase}
}