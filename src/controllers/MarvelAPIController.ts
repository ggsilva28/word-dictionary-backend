import { Request, Response } from "express"
import { MarvelAPIService } from "../services/MarvelAPIService";

class MarvelAPIController {

    async getCharacters(request: Request, response: Response) {
        const { user_id } = request;
        const { limit, offset } = request.query;

        const service = new MarvelAPIService()

        try {
            const data = await service.getCharacters(user_id, Number(limit), Number(offset))

            return response.json({
                code: 200,
                message: 'list.success',
                data: data
            })
        } catch (err) {
            return response.json({
                code: 400,
                error: err
            })
        }
    }

    async getComics(request: Request, response: Response) {
        const { user_id } = request;
        const { limit, offset } = request.query;

        const service = new MarvelAPIService()

        try {
            const data = await service.getComics(user_id, Number(limit), Number(offset))

            return response.json({
                code: 200,
                message: 'list.success',
                data: data
            })
        } catch (err) {
            return response.json({
                code: 400,
                error: err
            })
        }
    }
}

export { MarvelAPIController }