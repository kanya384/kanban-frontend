import { AuthApi } from "../repository/api/auth/auth"
 
import { AuthorizationUseCases } from "../useCase/authorization/authorization"
 
import { UserUseCases } from "../useCase/users/user"


export const useUseCases = (actions:any) => {
    const authUseCase = new AuthorizationUseCases(new AuthApi(), actions)
    //const userUseCase =  new UserUseCases(new UsersRepository(), actions)
    

    return {authUseCase}
}