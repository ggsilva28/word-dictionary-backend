import { Request, Response } from "express"
import { prismaClient } from "../prisma"

class WordsController {


    addList(request: Request, response: Response) {

        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(__dirname, '../../en.txt');
        const file = fs.readFileSync(filePath, 'utf8');
        const lines = file.split(/\r?\n/);
        const words = lines.map((line: string) => {
            return { word: line }
        })

        prismaClient.words.createMany({
            data: words,
            skipDuplicates: true
        }).then((result: any) => {
            return response.json({
                code: 200,
                message: 'words.added',
                data: result
            })
        }).catch((err: any) => {
            return response.json({
                code: 400,
                error: 'words.failed',
                data: err
            })
        })

    }

}

export { WordsController }