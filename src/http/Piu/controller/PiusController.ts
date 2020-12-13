import { Request, Response } from 'express';

import CreatePiuService from '../../../useCases/Piu/services/CreatePiuService';

import UsersRepository from '../../../useCases/User/repositories/UsersRepository';
import PiusRepository from '../../../useCases/Piu/repositories/PiusRepository';

class PiusController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { content } = request.body;
    const { id: user_id } = request.user;

    const usersRepository = new UsersRepository();
    const piusRepository = new PiusRepository();

    const createPiu = new CreatePiuService(usersRepository, piusRepository);

    const piu = await createPiu.execute({
      content,
      user_id,
    })

    return response.json(piu)
  }
}

export default PiusController;
