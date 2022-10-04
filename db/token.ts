import { getDbInstance } from "./utils"
import md5 from 'md5'
import { User, get as getUserFromDb } from "./user"

export type Token = string

export interface TokenData {
    [key: string]: {
        id: User['id'] // user id
        expire: number // unix timestamp from Math.floor(Data.now() / 1000)
    }
}

export async function init() {
    return await getDbInstance<TokenData>('token', {})
}

async function createUniqueToken() {
    const db = await init()
    let token: string
    do {
        token = md5(Math.random().toString())
    } while (db.data[token] !== undefined)
    return token
}

function now() {
    return Math.floor(Date.now() / 1000)
}

export async function getToken(
    id: User['id'],
): Promise<Token> {
    const db = await init()
    const user = await getUserFromDb(id)
    if (!user) {
        throw new Error('user_not_exist')
    }

    const token = await createUniqueToken()

    db.data[token] = {
        id, expire: now() + 3600 * 24 * 30 // now + 30 days
    }

    db.write()

    return token
}

export async function getUser(
    token: Token,
): Promise<User['id']> {
    const db = await init()

    if (!db.data[token]) {
        throw new Error('token_not_exist')
    }

    if (db.data[token].expire < now()) {
        throw new Error('token_expired')
    }

    return db.data[token].id
}

export async function logout(token: Token) {
    const db = await init()
    if (!db.data[token]) throw Error('already_logout')

    delete db.data[token]

    db.write()
}