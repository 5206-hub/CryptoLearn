"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/users?username=${username}&password=${password}`);
    const data = await res.json();

    if (data.success) {
      // Store user in localStorage for demo
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/feed");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="loginpagepp">
      <img className="imgloginpage" src="/loginpageabhi.webp" alt="" />
      <div className="innerlogin">
          <h2 className="text-xl11 font-bold">Login</h2>
          <form onSubmit={handleLogin} className="form1 flex flex-col max-w-xs mt-4">
            <label>Username</label>
            <input
              className="form11 border p-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <label className="ppp"> <p>Pass</p><p className="pp">word</p></label>
            <input
              className="form22 p-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btnlon">
              Login
            </button>
          </form>
      </div>
      
    </div>
  );
}   