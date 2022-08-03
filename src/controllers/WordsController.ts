import { Request, Response } from "express"
import { prismaClient } from "../prisma"
import { WordsServices } from "../services/WordsService";

class WordsController {

    async addList(request: Request, response: Response) {

        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(__dirname, '../../en.txt');
        const file = fs.readFileSync(filePath, 'utf8');
        const lines = file.split(/\r?\n/);
        const words = lines.map((line: string) => {
            return { word: line }
        })

        const service = new WordsServices()

        try {
            await service.addMany(words)
            return response.status(200).json({
                code: 200,
                message: 'words.add.success',
            })
        } catch (err) {
            return response.status(400).json({
                code: 400,
                message: 'words.add.failed',
                data: err
            })
        }

    }

    async list(request: Request, response: Response) {
        const service = new WordsServices()
        const { limit, offset } = request.query;

        try {
            const result = await service.get(Number(limit || 100), Number(offset || 0))
            return response.status(200).json({
                code: 200,
                message: 'words.list.success',
                data: result
            })
        } catch (err) {
            return response.status(400).json({
                code: 400,
                message: 'words.list.failed',
                data: err
            })
        }

    }
}

export { WordsController }