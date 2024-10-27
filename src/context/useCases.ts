import { createContext } from 'react'
import { AuthorizationUseCases } from '../useCase/authorization/authorization';
import { UserUseCases } from '../useCase/users/user';
 

interface UseCasesContextInterface {
    authUseCase: AuthorizationUseCases;
    userUseCase: UserUseCases;
}

export const UseCasesContext = createContext<UseCasesContextInterface | null>(null)