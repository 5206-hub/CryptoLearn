"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name || "");
      setEmail(parsedUser.email || "");
      setPhone(parsedUser.phone || "");
      setImage(parsedUser.image || "");
    }
  }, [router]);

  const handleSave = () => {
    if (!user) return;
    const updatedUser = { ...user, name, email, phone, image };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <div className="mt-2 flex flex-col max-w-xs">
        <label>Name:</label>
        <input
          className="border p-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          className="border p-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Phone:</label>
        <input
          className="border p-1"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Image URL:</label>
        <input
          className="border p-1"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={handleSave} className="mt-2 bg-blue-500 text-white py-1 rounded">
          Save Changes
        </button>
      </div>
      {image && (
        <div className="mt-4">
          <img src={image} alt="Profile" width="80" height="80" />
        </div>
      )}
    </div>
  );
}