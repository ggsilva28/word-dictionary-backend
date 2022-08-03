import { prismaClient } from "../prisma"

class WordsServices {

    addMany(words: any) {
        try {

            return prismaClient.words.createMany({
                data: words,
                skipDuplicates: true
            })

        } catch (err) {
            return err
        }
    }

    async get(limit: number, offset: number) {
        try {
            const get = await prismaClient.words.findMany({
                take: limit,
                skip: offset * limit,
                orderBy: {
                    createdAt: 'asc'
                }
            })

            const total = await prismaClient.words.count()

            return {
                offset: offset,
                limit: limit,
                total: total,
                results: get
            }
        } catch (err) {
            return err
        }
    }

}

export { WordsServices }