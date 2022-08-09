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

    async remove(word: string, user_id: string) {
        try {
            const remove = await prismaClient.userFavorites.deleteMany({
                where: {
                    userId: user_id,
                    word: word
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

    async isFavorite(word: string, user_id: string) {
        try {
            if (user_id) {
                const isFavorite = await prismaClient.userFavorites.findFirst({
                    where: {
                        userId: user_id,
                        word: word
                    }
                })

                return isFavorite? true : false
            }else{
                return false
            }
        } catch (err) {
            return err
        }
    }
}

export { UserFavoritesService }