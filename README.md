# labeddit API
Projeto incentivado pela instituição de tecnologia Labenu para o desenvolvimento full-stac de uma rede social baseado no Reddit

STACKS: Node.js (typescript), Express, Knex, SQLite

## ANOTAÇÕES IMPORTANTES
 ### Types and interfaces

 ```ts
 export interface TokenPayload {
    id: string,
    name: string,
}
 ```

```ts
export interface TokenDecode{
    id: string,
    name: string,
    iat: number,
    exp: number
}
 ```

 ### Code configuration IDgenerator
  ```ts
 import { v4 } from 'uuid'

 export class IdGenerator {
    public generate = (): string => {
        return v4()
    }
 }
 ```
 ### Code Configuration Token Generator

 ```ts
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
    }}
 ```
### Code Configuration Token Generator

```ts
public getPayload = (token: string): TokenPayload | null => {
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
```