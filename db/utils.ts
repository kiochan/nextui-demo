import { join as joinPath, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low, JSONFile, Adapter } from 'lowdb'

type lowDbAdapterCreator = <T>(path: string) => Adapter<T>

const createAdapter: lowDbAdapterCreator = function <T>(path: string) {
    return new JSONFile<T>(path)
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataStorageDir = joinPath(__dirname, '..', 'data')

export function getDbPath(dbName: string) {
    return joinPath(dataStorageDir, `${dbName}.json`)
}

// this variable store all database instance
// we don't have much data yet, so we just store all data in memory
const lowDbInstances = new Map<string, Low>()

export async function getDbInstance<T>(dbName: string, initData: T): Promise<Low<T>> {
    // check if it already exists in memory
    if (lowDbInstances.has(dbName)) {
        return lowDbInstances.get(dbName) as Low<T>
    }

    // if it doesn't exist, create new instance of it
    const adapter = createAdapter<T>(getDbPath(dbName))
    const db = new Low(adapter)

    // store it in map
    lowDbInstances.set(dbName, db)

    // read database
    await db.read()

    if (db.data === null) {
        // initialize data if it is not set
        db.data = initData
        await db.write() // wait it until it is initialized
    }

    // return low db instance
    return db
}