import CreateUserDTO from '../dtos/CreateUserDTO';
import User from '../models/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
  findByIdWithRelations(user_id: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

export default IUsersRepository;
