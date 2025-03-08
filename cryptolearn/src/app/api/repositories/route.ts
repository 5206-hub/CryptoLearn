import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Repository {
  id: number;
  title: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  repositories?: Repository[];
  // other fields...
}

// Paths to your data files
const dataFilePath = path.join(process.cwd(), "data.json");
const noticesFilePath = path.join(process.cwd(), "notices.json");

/**
 * GET /api/repositories?username=john&password=123
 * Returns the repositories array for the given user.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  if (!username || !password) {
    return NextResponse.json({ success: false, message: "Missing credentials" });
  }

  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    const users: User[] = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found or invalid credentials" });
    }
    return NextResponse.json({ success: true, repositories: user.repositories || [] });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error reading data" });
  }
}

/**
 * POST /api/repositories
 * Body: { username, password, title }
 * Adds a new repository for this user and appends a notice.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, title } = body;
    if (!username || !password || !title) {
      return NextResponse.json({ success: false, message: "Missing fields" });
    }

    // Read and parse data.json
    const data = fs.readFileSync(dataFilePath, "utf-8");
    const users: User[] = JSON.parse(data);

    // Find the user
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found or invalid credentials" });
    }

    if (!user.repositories) {
      user.repositories = [];
    }

    // Create a new repository object with a unique ID
    const newId = user.repositories.length > 0
      ? user.repositories[user.repositories.length - 1].id + 1
      : 1;

    const newRepo: Repository = { id: newId, title };

    // Add the new repository to the user's repositories array
    user.repositories.push(newRepo);

    // Write updated data to data.json
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

    // --- Append Notice ---
    // Read existing notices (if file exists, otherwise initialize as empty array)
    let notices = [];
    if (fs.existsSync(noticesFilePath)) {
      const noticesData = fs.readFileSync(noticesFilePath, "utf-8");
      notices = JSON.parse(noticesData);
    }
    // Create a new notice with a unique ID and timestamp
    const newNotice = {
      id: notices.length > 0 ? notices[notices.length - 1].id + 1 : 1,
      message: `${username} added a new repository: "${title}"`,
      timestamp: new Date().toISOString()
    };
    // Append the notice and write back to notices.json
    notices.push(newNotice);
    fs.writeFileSync(noticesFilePath, JSON.stringify(notices, null, 2));
    // --- End Append Notice ---

    return NextResponse.json({ success: true, repository: newRepo });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error processing request" });
  }
}

/**
 * DELETE /api/repositories
 * Body: { username, password, repoId }
 * Deletes the repository with the given repoId for the user.
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { username, password, repoId } = body;
    if (!username || !password || !repoId) {
      return NextResponse.json({ success: false, message: "Missing fields" });
    }

    // Read and parse data.json
    const data = fs.readFileSync(dataFilePath, "utf-8");
    const users: User[] = JSON.parse(data);

    // Find the user
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found or invalid credentials" });
    }

    if (!user.repositories) {
      user.repositories = [];
    }

    // Filter out the repository to be deleted
    user.repositories = user.repositories.filter(repo => repo.id !== repoId);

    // Write updated data to data.json
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, message: "Repository deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error processing request" });
  }
}
