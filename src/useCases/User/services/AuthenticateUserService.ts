import { sign } from 'jsonwebtoken';

import auth from '../../../config/auth';

import AppError from "../../../shared/errors/AppError";
import IHashProvider from "../../../shared/providers/HashProvider/IHashProvider";
import User from '../models/User';
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  private usersRepository: IUsersRepository;
  private hashProvider: IHashProvider;

  constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }


  public async execute({ email, password }: IRequest): Promise<{ user: User, token: string }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect E-mail/password combination', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService;
