import { Request, Response } from "express"
import { AuthService } from "../services/AuthService"

class AuthController {

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const service = new AuthService()

        try {
            const user = await service.login(email, password)

            return response.status(200).json({
                code: 200,
                message: 'login.success',
                data: user
            })
        } catch (err) {
            
            return response.status(401).json({
                code: 401,
                error: err
            })
        }
    }

}

export { AuthController }