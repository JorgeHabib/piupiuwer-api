import { Request, Response } from 'express';

import UsersRepository from '../../../useCases/User/repositories/UsersRepository';

import ShowUserProfileService from '../../../useCases/User/services/ShowUserProfileService';

// Create, update, delete, index, show
class ProfileController {
  public async show(request: Request, response: Response) {
    const { profile_user_id } = request.body;

    const { id: user_id } = request.user;

    const usersRepository = new UsersRepository();

    const showUserProfile = new ShowUserProfileService(usersRepository);

    const profile = await showUserProfile.execute({
      user_id,
      profile_user_id,
    });

    return response.json(profile)
  }
}

export default ProfileController;
