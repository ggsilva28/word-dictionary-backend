import { prismaClient } from "../prisma"

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

            return user;
        } catch (err) {
            throw err;
        }

    }

}

export { UserService, IUser }