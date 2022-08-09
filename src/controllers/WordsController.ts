import { Request, Response, urlencoded } from "express"
import { WordsServices } from "../services/WordsService";
import { UserFavoritesService } from "../services/UserFavoritesService";
import axios from "axios";

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
        const { limit, offset } = request.query;

        const service = new WordsServices()

        try {
            const result = await service.get(Number(limit || 100), Number(offset || 0))
            return response.status(200).json({
                code: 200,
                message: 'words.list.success',
                data: {
                    ...result, results: result.results.map((word: any) => {
                        return word.word
                    })
                }
            })
        } catch (err) {
            return response.status(400).json({
                code: 400,
                message: 'words.list.failed',
                data: err
            })
        }

    }

    async detail(request: Request, response: Response) {
        const { user_id } = request;
        const { word } = request.params;

        const service = new UserFavoritesService()
        const isFav = await service.isFavorite(word, user_id)

        try {
            const getWord = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)

            return response.status(200).json({
                code: 200,
                message: 'words.detail.success',
                data: {
                    isFavorite: isFav,
                    ...getWord.data[0]
                }
            })

        } catch (err) {
            return response.status(404).json({
                code: 400,
                message: 'words.detail.not_found',
                data: {
                    isFavorite: isFav,
                }
            })
        }

    }
}

export { WordsController }