import AppError from "../../../shared/errors/AppError";
import Piu from "../models/Piu";

import IUsersRepository from "../../User/repositories/IUsersRepository";
import IPiusRepository from "../repositories/IPiusRepository";
import IPiusLikesRepository from "../repositories/IPiusLikesRepository";

interface IRequest {
  piu_id: string;
  user_id: string;
}

class LikePiuService {
  private usersRepository: IUsersRepository;
  private piusRepository: IPiusRepository;
  private piusLikesRepository: IPiusLikesRepository;

  constructor(usersRepository: IUsersRepository, piusRepository: IPiusRepository, piusLikesRepository: IPiusLikesRepository) {
    this.usersRepository = usersRepository;
    this.piusRepository = piusRepository;
    this.piusLikesRepository = piusLikesRepository;
  }

  public async execute({ user_id, piu_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const piu = await this.piusRepository.findById(piu_id);

    if (!piu) {
      throw new AppError('Piu not found', 404);
    }

    const piuLike = await this.piusLikesRepository.findByUserAndPiu(user_id, piu_id);

    if (piuLike) {
      return;
    }

    const like = await this.piusLikesRepository.create({ user_id, piu_id });
    await this.piusLikesRepository.save(like);

    piu.likes += 1;

    await this.piusRepository.save(piu);
  }
}

export default LikePiuService;
