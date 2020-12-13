import Router from 'express';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';

import PiusController from '../controller/PiusController';
import PiusLikesController from '../controller/PiusLikesController';

const piuRoutes = Router();

const piusController = new PiusController();
const piusLikesController = new PiusLikesController();

piuRoutes.post('/', ensureAuthenticated, piusController.create);
piuRoutes.patch('/like', ensureAuthenticated, piusLikesController.create);

export default piuRoutes;
