import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  shortcut?: string;
  variant?: "dark" | "light";
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  className,
  shortcut,
  variant = "light",
}) => {
  const containerStyles = {
    dark: "bg-white/10 border-white/20 text-white placeholder-white/60",
    light: "bg-white border-gray-200 text-gray-900 placeholder-gray-400",
  };

  const iconStyles = {
    dark: "text-white/60",
    light: "text-gray-400",
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <Search
        size={15}
        className={cn("absolute left-3 shrink-0", iconStyles[variant])}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full pl-9 pr-12 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 transition-all",
          containerStyles[variant]
        )}
      />
      {shortcut && (
        <span
          className={cn(
            "absolute right-3 text-xs px-1.5 py-0.5 rounded border font-mono",
            variant === "dark"
              ? "text-white/50 border-white/20"
              : "text-gray-400 border-gray-200"
          )}
        >
          {shortcut}
        </span>
      )}
    </div>
  );
};

export default SearchBar;