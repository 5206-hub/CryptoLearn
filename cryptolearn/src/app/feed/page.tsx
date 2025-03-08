"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Repository {
  id: number;
  title: string;
}

export default function FeedPage() {
  const [user, setUser] = useState<any>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newRepo, setNewRepo] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchRepositories(parsedUser.username, parsedUser.password);
    }
  }, [router]);

  // Load the user's repositories from /api/repositories?username=...&password=...
  async function fetchRepositories(username: string, password: string) {
    const res = await fetch(`/api/repositories?username=${username}&password=${password}`);
    const data = await res.json();
    if (data.success) {
      setRepositories(data.repositories);
    } else {
      alert("Could not fetch repositories");
    }
  }

  // POST a new repository
  async function handleAddRepository() {
    if (!newRepo.trim() || !user) return;
    const res = await fetch("/api/repositories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        title: newRepo
      })
    });
    const data = await res.json();
    if (data.success) {
      // Re-fetch the updated list
      fetchRepositories(user.username, user.password);
      setNewRepo("");
    } else {
      alert("Could not add repository");
    }
  }

  // DELETE a repository
  async function handleDeleteRepository(repoId: number) {
    if (!user) return;
    const res = await fetch("/api/repositories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        repoId
      })
    });
    const data = await res.json();
    if (data.success) {
      // Re-fetch the updated list
      fetchRepositories(user.username, user.password);
    } else {
      alert("Could not delete repository");
    }
  }

  const filteredRepos = repositories.filter(repo =>
    repo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/");
  }

  return (
    <div className="feed22">
      <div className="feed221">
      <h2 className="text-xl1 font-bold">Welcome to Your Feed</h2>
      <div className="searchOF">
        <input
          className="searchbox border p-1"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="feed space-x-4">
        <button onClick={() => router.push("/profile")} className="bg-blue-500 text-white px-3 py-1 rounded">
          Profile
        </button>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
        <a href="/dashboard"><button className="dashbtn">Dashboard</button></a>
      </div>
      </div>
      <div>
        <div className="feed55">
        <div className="feed33">
        <h3 className="font-semibold">Repository Feed ({repositories.length})<p>Token Count: {repositories.length} Learn Coins [LC]</p></h3>
        <ul className="htm list-disc ml-5 mt-2">
          {filteredRepos.map(repo => (
            <li className="htn" key={repo.id}>
              {repo.title}
              <button
                onClick={() => handleDeleteRepository(repo.id)}
                className="ml-3 text-sm bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="feed44">
        <h3 className="font-semibold">Add a New Repository</h3>
        <input
          className="border p-1 mr-2"
          placeholder="Repository name"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button onClick={handleAddRepository} className="bg-green-500 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>
        </div>
      
      </div>  
    </div>
  );
}
