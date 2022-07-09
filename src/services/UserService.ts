import { prismaClient } from "../prisma"
import { sign } from "jsonwebtoken"

interface IUser {
    name: string
    email: string
    password: string
}

class UserService {

    async get(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })

        return user;
    }

    async create(data: IUser) {
        const { name, email, password } = data;

        try {
            const user = await prismaClient.user.create({
                data: { name, email, password }
            })

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
        } catch (err) {
            throw err;
        }

    }

}

export { UserService, IUser }