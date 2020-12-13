import { Request, Response } from 'express';

import UsersRepository from '../../../useCases/User/repositories/UsersRepository';
import StorageProvider from '../../../shared/providers/StorageProvider/StorageProvider';

import UpdateUserAvatarService from '../../../useCases/User/services/UpdateUserAvatarService';

// Create, update, delete, index, show
class AvatarController {
  public async update(request: Request, response: Response) {
    const { filename } = request.file;
    const { id: user_id } = request.user;

    const usersRepository = new UsersRepository();
    const storageProvider = new StorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository, storageProvider);

    await updateUserAvatar.execute({
      user_id,
      filename,
    })

    return response.status(204).json();
  }
}

export default AvatarController;
