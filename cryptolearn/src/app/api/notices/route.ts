import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const noticesFilePath = path.join(process.cwd(), "notices.json");

export async function GET() {
  let notices = [];
  if (fs.existsSync(noticesFilePath)) {
    const data = fs.readFileSync(noticesFilePath, "utf-8");
    notices = JSON.parse(data);
  }
  return NextResponse.json({ success: true, notices });
}
