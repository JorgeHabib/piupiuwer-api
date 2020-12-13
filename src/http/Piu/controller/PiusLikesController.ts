import { Request, Response } from 'express';

import LikePiuService from '../../../useCases/Piu/services/LikePiuService';

import UsersRepository from '../../../useCases/User/repositories/UsersRepository';
import PiusRepository from '../../../useCases/Piu/repositories/PiusRepository';
import PiusLikesRepository from '../../../useCases/Piu/repositories/PiusLikesRepository';

class PiusLikesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { piu_id } = request.body;
    const { id: user_id } = request.user;

    const usersRepository = new UsersRepository();
    const piusRepository = new PiusRepository();
    const piusLikesRepository = new PiusLikesRepository();

    const likePiu = new LikePiuService(usersRepository, piusRepository, piusLikesRepository);

    await likePiu.execute({ user_id, piu_id });

    return response.status(204).json();
  }
}

export default PiusLikesController;
