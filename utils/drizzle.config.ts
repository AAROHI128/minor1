import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.ts", // Ensure this path is correct
  out: "./drizzle",   
  dbCredentials: {
    url: "postgresql://teacher:mE1SoYy8tZvH@ep-gentle-frog-a597xz92.us-east-2.aws.neon.tech/student%20attendance?sslmode=require"
    
  } 
});
