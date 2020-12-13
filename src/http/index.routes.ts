import Router from 'express';

import usersRouter from './User/routes';
import piusRouter from './Piu/routes';
import dashRouter from './Dashboard/routes';

const routes = Router();

routes.use(usersRouter);
routes.use('/piu', piusRouter);
routes.use('/dashboard', dashRouter);

export default routes;
