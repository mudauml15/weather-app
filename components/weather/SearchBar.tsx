import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="relative p-4 flex justify-center bg-[#1E1E1E]">
      <div className="relative w-full max-w-3xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 z-10" />
        <Input
          className="w-full bg-white border-none pl-12 text-zinc-900  placeholder:text-zinc-500 rounded-3xl h-16"
          placeholder="Search location..."
        />
      </div>
    </div>
  );
}
