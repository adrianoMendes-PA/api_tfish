import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Peixe from '../models/Peixe';

class PeixeController {

    //lista os peixes cadastrados
    async index(req: Request, res: Response) {
        const repository = getRepository(Peixe);
        const peixes = await repository.find({
            order: { 'id': 'DESC' }
        });

        // const ult_peixe: any = await repository.findOne({
        //     where: { tipo_peixe: 'TESTE' },
        //     order: { 'id': 'DESC' }
        // });
        // res.header('retorno', ult_peixe.tipo_peixe);

        return res.json(peixes);
    }

    //cadastra peixe
    async create(req: Request, res: Response) {
        const schema = Yup.object().shape({
            tipo_peixe: Yup.string().required(),
            quant_peixe: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha ao cadastrar' });
        }

        const { tipo_peixe, quant_peixe, fase_criacao } = req.body;

        const repository = getRepository(Peixe);

        const user_id = req.userId;

        const peixe = repository.create({
            user_id,
            tipo_peixe,
            quant_peixe,
            fase_criacao
        });

        await repository.save(peixe);
        return res.status(201).json(peixe);
    }
}

export default new PeixeController();