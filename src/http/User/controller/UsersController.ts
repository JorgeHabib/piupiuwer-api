import { Request, Response } from 'express';

import HashProvider from '../../../shared/providers/HashProvider/HashProvider';
import UsersRepository from '../../../useCases/User/repositories/UsersRepository';

import CreateUserService from '../../../useCases/User/services/CreateUserService';

// Create, update, delete, index, show
class UsersController {
  public async create(request: Request, response: Response) {
    const name = request.body.name;
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    const hashProvider = new HashProvider();
    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const user = await createUser.execute({
      email,
      name,
      password,
      username,
    })

    return response.json({ user });
  }
}

export default UsersController;
