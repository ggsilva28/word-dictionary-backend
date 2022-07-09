import { Request, Response, NextFunction } from "express"
import crypto from "crypto"

export function passwordHash(request: Request, response: Response, next: NextFunction) {
    const { password } = request.body

    if (!password) {
        return response.status(400).json({
            errorCode: "password.missing"
        })
    }

    const salt = process.env.SALT
    const hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);

    request.body.password = hash;
    return next()
}