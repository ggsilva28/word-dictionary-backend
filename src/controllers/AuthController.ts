import { Request, Response } from "express"
import { AuthService } from "../services/AuthService"

class AuthController {

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const service = new AuthService()

        try {
            const user = await service.login(email, password)

            return response.json({
                code: 200,
                message: 'login.success',
                data: user
            })
        } catch (err) {
            
            return response.json({
                code: 400,
                error: err
            })
        }
    }

}

export { AuthController }