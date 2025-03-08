import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface User {
  id: number;
  username: string;
  password: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
}

// Path to your data.json in the project root
const dataFilePath = path.join(process.cwd(), "data.json");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  const data = fs.readFileSync(dataFilePath, "utf-8");
  const users: User[] = JSON.parse(data);

  if (username && password) {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      return NextResponse.json({ success: true, user });
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }
  }

  // If no query params, return all users or handle differently
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json() as User;
  const { username, password, name } = body;

  const data = fs.readFileSync(dataFilePath, "utf-8");
  const users: User[] = JSON.parse(data);

  // Check if user already exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return NextResponse.json({ success: false, message: "User already exists" });
  }

  // Create new user
  const newUser: User = {
    id: users.length + 1,
    username,
    password,
    name: name || "",
    email: "",
    phone: "",
    image: "https://via.placeholder.com/80",
  };

  users.push(newUser);

  // Write updated data to data.json
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ success: true, user: newUser });
}
