import { getDbInstance } from "./utils"

export interface User {
    id: number
    name: string
    email: string
    password: string
    registerIp: string
    lastLoginIp: string
}

export interface NewUser {
    id: number
    name: string
    email: string
    password: string
}

export interface NewUserWithIp extends NewUser {
    registerIp: string
}

export interface UserData {
    lastUsedId: number
    users: User[]
}

export async function init() {
    return await getDbInstance<UserData>('user', { users: [], lastUsedId: 10100 })
}

export async function create(
    newUser: NewUserWithIp,
): Promise<User> {
    const db = await init()
    const users = db.data.users
    for (const user of users) {
        if (user.email === newUser.email) throw new Error(`user_email_already_exists`)
    }

    const currentId = db.data.lastUsedId++

    if (!newUser.name) throw new Error(`user_name_invalid`)
    if (!newUser.email) throw new Error(`user_name_invalid`)
    if (!newUser.password) throw new Error(`user_password_invalid`)

    const currentNewUser = {
        id: currentId,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        registerIp: newUser.registerIp,
        lastLoginIp: newUser.registerIp
    }

    users.push(currentNewUser)

    db.write()

    return currentNewUser
}

export async function get(
    id: User['id']
): Promise<User> {
    const db = await init()
    const users = db.data.users
    for (const user of users) {
        if (user.id === id) return user
    }
    return undefined
}

export async function login(
    email: User['email'],
    password: User['password']
): Promise<User> {
    const db = await init()
    const users = db.data.users
    for (const user of users) {
        if (user.email === email) {
            if (user.password === password) {
                return user
            } else {
                throw new Error('login_invalid')
            }
        }
    }
    throw new Error('login_invalid')
}