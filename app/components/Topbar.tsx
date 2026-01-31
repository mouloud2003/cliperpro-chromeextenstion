import React from "react";
import { Feather, Search, Settings } from "lucide-react";
import Image from "next/image";
import "./Topbar.css";

export default function Topbar() {
  return (
    <div className="Topbar ">
      <div className="Topbar-left flex items-center gap-2">
        <Feather size={24} />
        <span className="Topbar-title font-bold text-lg text-slate-800 tracking-tight">
          Cliper Pro
        </span>
      </div>
      <div className="Topbar-middle" dir="rtl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="بحث في المكتبة..."
            className="search-container "
          />
        </div>
      </div>

      <div className="Topbar-right             flex items-center gap-4 w-[200px] justify-end      ">
        <button className="Topbar-button">usage:17/100</button>
        <button
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center overflow-hidden hover:border-indigo-300 transition-colors">
          <Image
            src="/bllk _ bachira.jpeg"
            alt="User"
            width={36}
            height={36}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>
    </div>
  );
}
