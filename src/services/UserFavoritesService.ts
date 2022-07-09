import { prismaClient } from "../prisma"
import { MarvelAPIService } from "./MarvelAPIService"

interface UserFavorites {
    id: number
    name: string
    description: string
    thumbnail: string
    link: string
}

class UserFavoritesService {

    async add(user_id: string, data: UserFavorites, type: string) {
        try {

            const add = await prismaClient.userFavorites.create({
                data: {
                    userId: user_id,
                    type: type,
                    name: data.name,
                    description: data.description,
                    thumbnail: data.thumbnail,
                    link: data.link,
                    marvelId: data.id
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

    async get(user_id: string, type: string) {
        try {
            const get = await prismaClient.userFavorites.findMany({
                where: {
                    userId: user_id,
                    type: type
                }
            })

            return get
        } catch (err) {
            return err
        }

    }
}

export { UserFavoritesService }