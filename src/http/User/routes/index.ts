import Router from 'express';
import multer from 'multer';

import uploadConfig from '../../../config/upload';

import ensureAuthenticated from '../../../shared/middlewares/ensureAuthenticated';

import UsersController from '../controller/UsersController';
import SessionsController from '../controller/SessionsController';
import ProfileController from '../controller/ProfileController';
import AvatarController from '../controller/AvatarController';

const userRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const sessionsController = new SessionsController();
const profileController = new ProfileController();
const avatarController = new AvatarController();

// GET, POST, PUT, PATCH, DELETE
userRouter.post('/register', usersController.create);
userRouter.post('/login', sessionsController.create);
userRouter.get('/profile', ensureAuthenticated, profileController.show);
userRouter.patch('/avatar', upload.single('avatar'), ensureAuthenticated, avatarController.update)


export default userRouter;
