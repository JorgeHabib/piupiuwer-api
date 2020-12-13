import { Request, Response } from 'express';

import UsersRepository from '../../../useCases/User/repositories/UsersRepository';
import PiusRepository from '../../../useCases/Piu/repositories/PiusRepository';

import GetUserDashboardService from '../../../useCases/Dashboard/service/GetUserDashboardService';

class DashboardController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const usersRepository = new UsersRepository();
    const piusRepository = new PiusRepository();

    const getUserDashboard = new GetUserDashboardService(usersRepository, piusRepository);

    const pius = await getUserDashboard.execute({ user_id });

    return response.json(pius);
  }
}

export default DashboardController;
