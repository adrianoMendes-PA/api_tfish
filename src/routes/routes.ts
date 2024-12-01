import { Router } from "express";

import UsuarioController from "../app/controllers/UsuarioController";
import SessionController from "../app/controllers/SessionController";
import TanqueController from "../app/controllers/TanqueController";
import PeixeController from "../app/controllers/PeixeController";

import authMiddleware from "../app/middlewares/authMiddleware";

const routes = Router();

//CADASTRO UM USUÁRIO
routes.post("/usuario", UsuarioController.create);

//LOGA O USUÁRIO
routes.post("/session", SessionController.create);

// TUDO ABAIXO DESSE MIDDLEWARE PRECISA PASSAR PELA AUTENTICAÇÃO
routes.use(authMiddleware);

routes.post("/tanque", TanqueController.create);
routes.get("/tanque", TanqueController.index);
routes.delete("/tanque/:id", TanqueController.delete)

routes.post("/peixe", PeixeController.create);
routes.get("/peixe", PeixeController.index);
routes.delete("/peixe/:id", PeixeController.delete);

export default routes;
