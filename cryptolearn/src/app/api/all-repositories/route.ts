// src/app/api/all-repositories/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Repository {
  id: number;
  title: string;
  owner: string; // e.g., username of the owner
}

interface User {
  username: string;
  repositories?: Repository[];
}

const dataFilePath = path.join(process.cwd(), "data.json");

export async function GET() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  const users: User[] = JSON.parse(data);

  // Flatten all repositories from all users
  const allRepos: Repository[] = [];
  users.forEach((user) => {
    user.repositories?.forEach((repo) => {
      allRepos.push({ ...repo, owner: user.username });
    });
  });

  return NextResponse.json({ success: true, repositories: allRepos });
}
