import dotenv from "dotenv";
import path from "path";

const dotenvPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: dotenvPath });
