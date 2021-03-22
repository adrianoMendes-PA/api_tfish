import { Router } from 'express';

import UsuarioController from '../app/controllers/UsuarioController';
import SessionController from '../app/controllers/SessionController';
import TanqueController from '../app/controllers/TanqueController';
import PeixeController from '../app/controllers/PeixeController';

import authMiddleware from '../app/middlewares/authMiddleware';

const routes = Router();

routes.post('/usuario', UsuarioController.create);
routes.post('/session', SessionController.create);

// TUDO ABAIXO DESSE MIDDLEWARE PRECISA SER AUTENTICADO
routes.use(authMiddleware);

routes.post('/tanque', TanqueController.create);
routes.get('/tanque', TanqueController.index);

routes.post('/peixe', PeixeController.create);
routes.get('/peixe', PeixeController.index);

export default routes;