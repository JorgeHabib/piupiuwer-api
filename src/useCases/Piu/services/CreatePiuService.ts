import AppError from "../../../shared/errors/AppError";
import IUsersRepository from "../../User/repositories/IUsersRepository";
import Piu from "../models/Piu";
import IPiusRepository from "../repositories/IPiusRepository";

interface IRequest {
  content: string;
  user_id: string;
}

class CreatePiuService {
  private usersRepository: IUsersRepository;
  private piusRepository: IPiusRepository;

  constructor(usersRepository: IUsersRepository, piusRepository: IPiusRepository) {
    this.usersRepository = usersRepository;
    this.piusRepository = piusRepository;
  }

  public async execute({ content, user_id }: IRequest): Promise<Piu> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (!content) {
      throw new AppError('Invalid content', 401);
    }

    const piu = await this.piusRepository.create({ content, user_id });

    await this.piusRepository.save(piu);

    return piu;
  }
}

export default CreatePiuService;
