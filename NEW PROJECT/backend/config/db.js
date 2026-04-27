import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, DATABASE_URL } = process.env;

const requiredEnv = [PGHOST, PGDATABASE, PGUSER, PGPASSWORD];
const hasPgConfig = requiredEnv.every(Boolean);

if (!DATABASE_URL && !hasPgConfig) {
	throw new Error(
		"Missing database configuration. Set DATABASE_URL or PGHOST, PGDATABASE, PGUSER, and PGPASSWORD in backend/.env."
	);
}

const connectionString = DATABASE_URL
	? DATABASE_URL
	: `postgresql://${encodeURIComponent(PGUSER)}:${encodeURIComponent(PGPASSWORD)}@${PGHOST}/${PGDATABASE}?sslmode=require`;

const sql = neon(connectionString);

export default sql;