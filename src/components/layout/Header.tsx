"use client";

import React from "react";
import { Bell, ChevronDown } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="h-14 bg-[#1E1B4B] flex items-center px-4 gap-4 shrink-0 z-30 relative">
      {/* Logo + Workspace */}
      <div className="flex items-center gap-4 min-w-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/kb-icon.svg" alt="Logo" width={30} height={30} />
          <span className="text-white font-semibold text-lg tracking-wide">
            Worcspace
          </span>
        </div>

        {/* Workspace Selector */}
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 transition-colors ml-1">
          <span className="text-white/90 text-xs font-medium">Worcspace 1</span>
          <ChevronDown size={13} className="text-white/60" />
        </button>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <SearchBar
          placeholder="Search..."
          shortcut="⌘K"
          variant="dark"
          className="w-full"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Bell size={18} className="text-white/80" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
          <span className="text-white text-xs font-semibold">OK</span>
        </div>
      </div>
    </header>
  );
};

export default Header;