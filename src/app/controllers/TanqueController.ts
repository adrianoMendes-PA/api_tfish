import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";

import Tanque from "../models/Tanque";

class TanqueController {
  //LISTA TODOS OS TANQUES
  async index(req: Request, res: Response) {
    const repository = getRepository(Tanque);
    const tanques = await repository.find({
      where: { user_id: req.userId },
      order: { id: "DESC" },
    });

    //mostra o total de tanques cadastrados
    const count: any = await repository.count({
      where: { user_id: req.userId },
    });
    res.header("x-total-count", count);

    return res.json(tanques);
  }

  //CRIA UM TANQUE
  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      largura: Yup.string().required(),
      comprimento: Yup.string().required(),
      profundidade: Yup.string().required(),
      quant_peixe: Yup.string().required(),
      tipo_peixe: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha ao cadastrar" });
    }

    const {
      nome_tanque,
      largura,
      profundidade,
      comprimento,
      quant_peixe,
      tipo_peixe,
    } = req.body;
    const repository = getRepository(Tanque);

    const user_id = req.userId;

    const tanque = repository.create({
      user_id,
      nome_tanque,
      largura,
      profundidade,
      comprimento,
      quant_peixe,
      tipo_peixe,
    });

    await repository.save(tanque);
    return res.status(201).json(tanque);
  }

  // DELETA TANQUE
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const repository = getRepository(Tanque);

    try {
      // Verifica se o tanque existe e pertence ao usuário autenticado
      const tanque = await repository.findOne({
        where: { id, user_id: req.userId },
      });

      if (!tanque) {
        return res.status(404).json({
          error: "Tanque não encontrado ou não pertence ao usuário",
        });
      }

      // Remove o tanque
      await repository.remove(tanque);
      return res.status(200).json({ message: "Tanque removido com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar tanque:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
export default new TanqueController();
