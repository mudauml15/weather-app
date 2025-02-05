import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (city: string) => void;
}
export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="relative mt-[-1rem] flex justify-center bg-[#1E1E1E]">
      <div className="relative w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-3xl px-4 sm:px-0"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 z-10" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-none pl-12 text-zinc-900  placeholder:text-zinc-500 rounded-3xl h-16"
            placeholder="Search location... (e.g., Durban)"
          />
        </form>
      </div>
    </div>
  );
}
