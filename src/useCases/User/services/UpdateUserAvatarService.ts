import AppError from "../../../shared/errors/AppError";
import User from "../models/User";
import IUsersRepository from "../repositories/IUsersRepository";
import IStorageProvider from "../../../shared/providers/StorageProvider/IStorageProvider";

interface IRequest {
  filename: string;
  user_id: string;
}

class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;
  private storageProvider: IStorageProvider;

  constructor(usersRepository: IUsersRepository, storageProvider: IStorageProvider) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({ filename, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      await this.storageProvider.deleteTempFile(filename);
      throw new AppError('User not found', 404);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    await this.storageProvider.saveFile(filename);

    user.avatar = filename;

    await this.usersRepository.save(user);
  }
}

export default UpdateUserAvatarService;
