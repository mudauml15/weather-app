import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
      <Input
        className="w-full bg-zinc-800 border-none pl-10 text-white placeholder:text-zinc-400"
        placeholder="Search location..."
      />
    </div>
  );
}