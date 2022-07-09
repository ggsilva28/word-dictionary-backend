import { prismaClient } from "../prisma"
import { sign } from "jsonwebtoken"

class AuthService {

    async login(email: string, password: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw "user.not_found"
        }

        if (user.password !== password) {
            throw "user.invalid_password"
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    email: user.email,
                    id: user.id
                }
            }
            , process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        )


        return { user, token };
    }

}

export { AuthService }