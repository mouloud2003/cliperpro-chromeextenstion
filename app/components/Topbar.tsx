import React from "react";
import { Feather, Search, Settings } from "lucide-react";
import Image from "next/image";
import "./Topbar.css";

export default function Topbar({
  user,
  usage = "17/100",
}: {
  user?: { name: string; image: string };
  usage?: string;
}) {
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

      <div className="Topbar-right flex items-center gap-3 w-[220px] justify-end">
        <button className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-xs font-semibold text-indigo-600 tracking-wide shadow-sm hover:shadow-md hover:from-indigo-100 hover:to-purple-100 transition-all duration-200">
          ⚡ {usage}
        </button>
        <button
          className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-500 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all duration-200"
          title="Settings"
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-200 flex items-center justify-center overflow-hidden hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-100 transition-all duration-200 cursor-pointer">
          <Image
            src={user?.image ?? "/bllk _ bachira.jpeg"}
            alt="User"
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
