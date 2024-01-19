import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export interface TokenPayload {
    id: string,
    name: string,
}

export interface TokenDecode{
    id: string,
    name: string,
    iat: number,
    exp: number
  }

export class TokenManager {
    public createToken = (payload: TokenPayload): string => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return token
    }

    public getPayload = (token: string): TokenPayload | null => {
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0Mjg5ZDM2LTAzYmEtNDQyYS04OGFjLWIwMmM3M2FlNzg2MyIsIm5hbWUiOiJndWlybWVzX2dhbWVwbGF5cyIsImlhdCI6MTcwMjc1NDU3NywiZXhwIjoxNzAzMzU5Mzc3fQ.2-Unqgji8vdD-NHLM-1HN9mUkAAKAr9Wqq99eGGaDVY'
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            )

            return payload as TokenPayload
        } catch (error) {
            return null
        }
    }
}