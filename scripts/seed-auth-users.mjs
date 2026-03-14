import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const seededUsers = [
  {
    email: "client.adebayo@hometrust.local",
    password: "HomeTrust123!",
    fullName: "Kunle Adebayo",
    role: "CLIENT",
  },
  {
    email: "client.okafor@hometrust.local",
    password: "HomeTrust123!",
    fullName: "Chioma Okafor",
    role: "CLIENT",
  },
  {
    email: "client.sule@hometrust.local",
    password: "HomeTrust123!",
    fullName: "Amina Sule",
    role: "CLIENT",
  },
  {
    email: "client.ebi@hometrust.local",
    password: "HomeTrust123!",
    fullName: "Ebi Hart",
    role: "CLIENT",
  },
  {
    email: "team.balogun@hometrust.local",
    password: "HomeTrust123!",
    fullName: "Tunde Balogun",
    role: "TEAM_MEMBER",
  },
  {
    email: "team.onyeka@hometrust.local",
    password: "HomeTrust123!",
    fullName: "Ngozi Onyeka",
    role: "TEAM_MEMBER",
  },
  {
    email: "ops.adeyemi@hometrust.local",
    password: "HomeTrust123!",
    fullName: "Folake Adeyemi",
    role: "OPERATIONS_MANAGER",
  },
  {
    email: "admin@hometrust.local",
    password: "HomeTrust123!",
    fullName: "HomeTrust Admin",
    role: "ADMIN",
  },
  {
    email: "client.invited@hometrust.local",
    password: `invite-${crypto.randomUUID()}`,
    fullName: "Pending Invite Client",
    role: "CLIENT",
  },
];

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const contents = fs.readFileSync(filePath, "utf8");
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function loadProjectEnv() {
  const rootDir = process.cwd();
  loadEnvFile(path.join(rootDir, ".env"));
  loadEnvFile(path.join(rootDir, ".env.local"));
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  loadProjectEnv();

  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  for (const seededUser of seededUsers) {
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email: seededUser.email,
      password: seededUser.password,
      email_confirm: true,
      user_metadata: {
        full_name: seededUser.fullName,
        role: seededUser.role,
      },
      app_metadata: {
        provider: "email",
        providers: ["email"],
      },
    });

    if (createError) {
      if (/already registered|already been registered|already exists/i.test(createError.message)) {
        console.log(`Skipped existing auth user ${seededUser.email}`);
        continue;
      }
      throw createError;
    }

    console.log(`Created auth user ${seededUser.email} (${created.user?.id ?? "unknown-id"})`);
  }

  console.log("Seed auth users completed.");
}

main().catch((error) => {
  console.error("Failed to seed auth users.", error);
  process.exitCode = 1;
});
