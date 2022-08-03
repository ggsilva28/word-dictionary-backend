import { Request, Response } from "express"
import { UserService } from "../services/UserService"

class UserController {

    async profile(request: Request, response: Response) {
        const { user_id } = request;

        const service = new UserService()

        const result = await service.get(user_id)

        return response.status(200).json({
            code: 200,
            message: 'user.get',
            data: result
        })
    }

    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const service = new UserService()

        try {
            const result = await service.create({ name, email, password })
            return response.status(200).json({
                code: 200,
                message: 'user.created',
                data: result
            })
            
        } catch (err) {

            return response.status(400).json({
                code: 400,
                error: 'user.not_created',
                data: err
            })
        }

    }
}

export { UserController }