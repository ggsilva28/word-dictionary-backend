import { prismaClient } from "../prisma"

interface UserFavorites {
    word?: string
}

class UserFavoritesService {

    async add(user_id: string, data: UserFavorites) {
        try {

            const add = await prismaClient.userFavorites.create({
                data: {
                    userId: user_id,
                    word: data.word,
                }
            })

            return add
        } catch (err) {
            return err
        }
    }

    async remove(id: string) {
        try {
            const remove = await prismaClient.userFavorites.delete({
                where: {
                    id: id
                }
            })

            return remove
        } catch (err) {
            return err
        }
    }

    async get(user_id: string, limit: number, offset: number) {
        try {
            const get = await prismaClient.userFavorites.findMany({
                take: limit,
                skip: offset * limit,
                where: {
                    userId: user_id,
                },
            })

            const total = await prismaClient.userFavorites.count({
                where: {
                    userId: user_id,
                }
            })

            return {
                offset: offset,
                limit: limit,
                total: total,
                results: get.map(e => {
                    return e.word
                })
            }
        } catch (err) {
            return err
        }

    }
}

export { UserFavoritesService }