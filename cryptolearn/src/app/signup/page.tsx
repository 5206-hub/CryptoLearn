"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password, name }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.success) {
      alert("User created! You can now log in.");
      router.push("/login");
    } else {
      alert("Sign Up failed or user already exists.");
    }
  };

  return (
    <div className="p-4">
      <img className="imgsininpage" src="/signuppage_enhanced.webp" alt="" />
      <div className="innersignup">
        <h2 className="text-xl font-bold">Sign Up</h2>

        <form onSubmit={handleSignUp} className="usersine flex flex-col max-w-xs mt-4">
          <label>Username</label>
          <input
            className="usersin1 border p-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            className="usersin2 border p-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="">Full Name</label>
          <input
            className="border p-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btnsin">
            Sign Up
          </button>
        </form>

      </div>

    </div>
  );
}
