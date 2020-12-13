import { getRepository, Repository } from 'typeorm';
import CreateUserDTO from '../dtos/CreateUserDTO';

import User from '../models/User';
import IUserRepository from './IUsersRepository';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { username }
    });

    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id);

    return user;
  }

  public async findByIdWithRelations(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: user_id },
      relations: ['pius'],
    });

    return user;
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    return user;
  }

  public async save(data: User): Promise<User> {
    const user = await this.ormRepository.save(data);

    return user;
  }
}

export default UsersRepository;
