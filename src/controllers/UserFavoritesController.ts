import { Request, Response } from "express"
import { UserFavoritesService } from "../services/UserFavoritesService"

class UserFavoritesController {

    async addFavorite(request: Request, response: Response) {
        const { user_id } = request;
        const { type, data } = request.body;

        const service = new UserFavoritesService()

        try {
            const result = await service.add(user_id, data, type)
            return response.json({
                code: 200,
                message: 'favorite.added',
                data: { ...result, isFavorite: true, userFavoriteId: result.id }
            })

        } catch (err) {

            return response.json({
                code: 400,
                error: 'favorite.failed',
                data: err
            })
        }
    }

    async removeFavorite(request: Request, response: Response) {
        const { id } = request.params;

        const service = new UserFavoritesService()

        try {
            const result = await service.remove(id)
            return response.json({
                code: 200,
                message: 'favorite.removed',
                data: { ...result, isFavorite: false }
            })

        } catch (err) {

            return response.json({
                code: 400,
                error: 'favorite.failed',
                data: err
            })
        }
    }

    async getFavorites(request: Request, response: Response) {
        const { user_id } = request;
        const { type, limit, offset } = request.query;

        const service = new UserFavoritesService()

        try {
            const result = await service.get(user_id, type.toString(), Number(limit), Number(offset))
            return response.json({
                code: 200,
                message: 'favorites.found',
                data: result
            })

        } catch (err) {

            return response.json({
                code: 400,
                error: 'favorites.not_found',
                data: err
            })
        }
    }
}

export { UserFavoritesController }