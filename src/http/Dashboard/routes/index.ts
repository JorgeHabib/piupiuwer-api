import Router from 'express';

import DashboardController from '../controller/DashboardController';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';

const dashRoutes = Router();

const dashboardController = new DashboardController();

dashRoutes.get('/', ensureAuthenticated, dashboardController.show);

export default dashRoutes;
