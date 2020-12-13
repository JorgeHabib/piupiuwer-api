import AppError from "../../../shared/errors/AppError";
import IUsersRepository from "../../User/repositories/IUsersRepository";
import Piu from "../../Piu/models/Piu";
import IPiusRepository from "../../Piu/repositories/IPiusRepository";

interface IRequest {
  user_id: string;
}

class GetUserDashboardService {
  private usersRepository: IUsersRepository;
  private piusRepository: IPiusRepository;

  constructor(usersRepository: IUsersRepository, piusRepository: IPiusRepository) {
    this.usersRepository = usersRepository;
    this.piusRepository = piusRepository;
  }

  public async execute({ user_id }: IRequest): Promise<Piu[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const pius = await this.piusRepository.findAll();

    return pius;
  }
}

export default GetUserDashboardService;
