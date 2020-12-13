import { Request, Response } from 'express';

import HashProvider from '../../../shared/providers/HashProvider/HashProvider';
import UsersRepository from '../../../useCases/User/repositories/UsersRepository';

import AuthenticateUserService from '../../../useCases/User/services/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const hashProvider = new HashProvider();
    const usersRepository = new UsersRepository();

    const authenticateUser = new AuthenticateUserService(usersRepository, hashProvider);

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.json({ user, token });
  }
}

export default SessionsController;
