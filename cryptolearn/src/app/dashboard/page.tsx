"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Repository {
  id: number;
  title: string;
  owner: string; // who owns the repo
}

interface Notice {
  id: number;
  message: string;
  timestamp: string;
}

export default function DashboardPage() {
  const [allRepos, setAllRepos] = useState<Repository[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  // Fetch all repositories on mount
  useEffect(() => {
    fetchAllRepos();
    fetchNotices();
  }, []);

  async function fetchAllRepos() {
    const res = await fetch("/api/all-repositories");
    const data = await res.json();
    if (data.success) {
      setAllRepos(data.repositories);
    }
  }

  async function fetchNotices() {
    const res = await fetch("/api/notices");
    const data = await res.json();
    if (data.success) {
      setNotices(data.notices);
    }
  }

  // Filter the feed by search query (matches repo title or owner)
  const filteredRepos = allRepos.filter((repo) =>
    repo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white flex items-center px-4 py-2">
        <div className="text-xl font-bold mr-auto">CRYPTOLEARN</div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="px-2 py-1 rounded mr-2 text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Account & Settings */}
        <Link href="/profile" className="mr-4">
          <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded">
            Account
          </button>
        </Link>
        <Link href="/Aboutus">
          <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded">
            Home
          </button>
        </Link>
      </header>

      {/* Main Content: 3 columns */}
      <div className="flex flex-grow">
        {/* Left Column: Your Repositories (or placeholder) */}

        {/* Center Column: Feed (All Repos) */}
        <main className="middle flex-grow bg-white p-4">
          <h2 className="font-bold text-lg mb-3">Latest Activity</h2>
          <div className="space-y-3">
            {filteredRepos.map((repo) => (
              <div key={repo.id} className="bg-gray-50 p-2 border border-gray-200">
                <div className="font-semibold">{repo.owner}</div>
                <div>{`Repository: ${repo.title}`}</div>
              </div>
            ))}
            {filteredRepos.length === 0 && (
              <p>No repositories found.</p>
            )}
          </div>
        </main>
        {/* Right Column: Notice Board */}
        <aside className="right w-1/4 bg-gray-100 p-4">
          <h2 className="font-bold mb-2">Notice Board</h2>
          <ul className="list-none space-y-2">
            {notices.map((notice) => (
              <li key={notice.id} className="bg-yellow-50 p-2 border border-yellow-300">
                {notice.message}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
