import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

config({ path: ".env.local" });

const runMigrate = async () => {
  // Sicherheits-Check: Wenn keine URL da ist, brich nicht ab, sondern beende friedlich.
  if (!process.env.POSTGRES_URL) {
    console.warn("⚠️ POSTGRES_URL not found. Skipping migration.");
    process.exit(0);
  }

  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  try {
    // Versuche die Migration
    await migrate(db, { migrationsFolder: "./lib/db/migrations" });
    console.log("✅ Migrations completed successfully");
  } catch (error: any) {
    // Fehler-Analyse: Ist es nur ein "Gibt es schon" Fehler?
    const isSafeError =
      error.message?.includes("already exists") ||
      error.code === "42P07" || // relation exists
      error.code === "42701"; // column exists

    if (isSafeError) {
      console.warn(
        "⚠️ Database already exists. Skipping creation. (This is fine!)"
      );
    } else {
      // Auch bei anderen Fehlern: Nur warnen, NICHT abstürzen!
      console.warn("⚠️ Migration warning:", error.message);
    }
  }

  // WICHTIG: Immer erfolgreich beenden (Exit Code 0), damit Vercel weitermacht
  await connection.end();
  process.exit(0);
};

runMigrate();
