
# Database setup

Install the backend dependencies from the backend folder:

```bash
cd backend
npm install
```

The backend connects to Neon through `backend/config/db.js`. That file reads these environment variables from `backend/.env`:

- `PGHOST`
- `PGDATABASE`
- `PGUSER`
- `PGPASSWORD`
- `PORT`

You can also use a single `DATABASE_URL` instead of the `PG*` values, but the current setup prefers the explicit `PGHOST`/`PGDATABASE`/`PGUSER`/`PGPASSWORD` format.

Example `backend/.env`:

```env
PORT=3000
PGHOST=ep-long-bonus-anx67dkj.c-6.us-east-1.aws.neon.tech
PGDATABASE=neondb
PGUSER=neondb_owner
PGPASSWORD=your_password_here
```

Connection flow:

1. `dotenv` loads `backend/.env`.
2. `backend/config/db.js` reads the Neon variables.
3. `@neondatabase/serverless` creates the SQL client.
4. Your route handlers import the `sql` client and run queries.

If you want to test the connection, add a simple query in a route or controller such as:

```js
import sql from "../config/db.js";

const result = await sql`SELECT NOW() AS current_time`;
```



C:\Users\Abhishek\Desktop\Project\NEW PROJECT\backend>npm i express dotenv cors helmet morgan @neondatabase/serverless @arcjet/node


Try Arcjet: https://launch.arcjet.com/CFzn2XF
Try Neon: https://fyi.neon.tech/2aap

npx neonctl@latest init

postgresql://neondb_owner:npg_0IUVadoFnQ6q@ep-long-bonus-anx67dkj.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require

Host
ep-long-bonus-anx67dkj.c-6.us-east-1.aws.neon.tech
Database
neondb
Role
neondb_owner
Password
************
Pooler host
ep-long-bonus-anx67dkj-pooler.c-6.us-east-1.aws.neon.tech

npx neonctl@latest init