import { getDbInstance } from "./utils"
import { User } from "./user"
import { getUser, Token } from "./token"

const allowPermission = ["superuser", "god", "normal"] as const
export type Permission = typeof allowPermission[number]

export interface PermissionData {
    [userId: string]: Permission[]
}

export async function init() {
    return await getDbInstance<PermissionData>('permission', {})
}

export async function getPermission(
    userId: User['id'],
): Promise<Permission[]> {
    const db = await init()

    if (db.data[userId]) {
        return db.data[userId]
    }

    return []

}


export async function addPermission(
    userId: User['id'],
    permissions: Permission[]
): Promise<Permission[]> {
    const db = await init()

    const newPermissions = Array.from(
        new Set<Permission>(
            [
                ...(db.data[userId]?? []),
                ...permissions
            ]
        )
    )
    db.data[userId] = newPermissions

    db.write()

    return db.data[userId]
}

export async function setPermission(
    userId: User['id'],
    permissions: Permission[]
): Promise<Permission[]> {
    const db = await init()

    const newPermissions = Array.from(
        new Set<Permission>(
            [
                ...permissions
            ]
        )
    )
    db.data[userId] = newPermissions

    db.write()

    return db.data[userId]
}

export async function removePermission(
    userId: User['id'],
    permissions: Permission[]
): Promise<Permission[]> {
    const db = await init()

    let newPermissions = (db.data[userId]?? [])
    .filter(
        _permissions => !permissions.includes(_permissions)
    )
    db.data[userId] = newPermissions

    db.write()

    return db.data[userId]
}