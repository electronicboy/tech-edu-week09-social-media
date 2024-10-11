import {Pool} from "pg";

let pool: Pool | null = null;

export function db(): Pool {
    if (!pool || pool.ended) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL
        })
    }
    return pool;
}
