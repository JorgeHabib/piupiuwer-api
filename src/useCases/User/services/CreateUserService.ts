import AppError from "../../../shared/errors/AppError";
import IHashProvider from "../../../shared/providers/HashProvider/IHashProvider";
import User from "../models/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}

class CreateUserService {
  private usersRepository: IUsersRepository;
  private hashProvider: IHashProvider;

  constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ name, email, username, password }: IRequest): Promise<User> {
    const emailUsed = await this.usersRepository.findByEmail(email);

    if (emailUsed) {
      throw new AppError('E-mail already used');
    }

    const usernameUsed = await this.usersRepository.findByUsername(username);

    if (usernameUsed) {
      throw new AppError('Username already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      username,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
