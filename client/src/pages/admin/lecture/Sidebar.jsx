import {
  ChartNoAxesColumn,
  SquareLibrary,
  Star,
  PanelLeft,
  X,
  Sparkles,
} from "lucide-react";

import React, { useState } from "react";

import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: ChartNoAxesColumn,
      path: "dashboard",
      color: "text-indigo-400",
    },
    {
      name: "Courses",
      icon: SquareLibrary,
      path: "course",
      color: "text-green-400",
    },
    {
      name: "Reviews",
      icon: Star,
      path: "review",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 h-11 w-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center"
      >
        <PanelLeft size={20} />
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 p-6 transition-all duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >

        {/* CLOSE BUTTON MOBILE */}
        <div className="flex lg:hidden justify-end mb-5">
          <button
            onClick={() => setOpen(false)}
            className="h-10 w-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* LOGO */}
        <div className="mb-10">

          <div className="flex items-center gap-3">

            <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/20">

              <Sparkles className="text-indigo-400" />

            </div>

            <div>
              <h1 className="text-2xl font-bold">
                NextSkills
              </h1>

              <p className="text-slate-400 text-sm">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-3">

          {menuItems.map((item, index) => {
            const isActive =
              location.pathname.includes(item.path);

            return (
              <Link
                key={index}
                to={item.path}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 border
                  
                  ${
                    isActive
                      ? "bg-indigo-600/15 border-indigo-500/30 shadow-lg shadow-indigo-500/10"
                      : "border-transparent hover:bg-slate-900 hover:border-slate-800"
                  }
                `}
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center
                    ${
                      isActive
                        ? "bg-indigo-500/20"
                        : "bg-slate-900"
                    }`}
                  >
                    <item.icon
                      size={22}
                      className={
                        isActive
                          ? "text-indigo-400"
                          : item.color
                      }
                    />
                  </div>

                  <div>
                    <h1
                      className={`font-medium text-base
                      ${
                        isActive
                          ? "text-white"
                          : "text-slate-300"
                      }`}
                    >
                      {item.name}
                    </h1>
                  </div>
                </div>

                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-indigo-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-6 left-6 right-6">

          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl p-4">

            <h3 className="font-semibold">
              Upgrade Your Platform 🚀
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Manage courses, students and analytics
              in one place.
            </p>
          </div>
        </div>
      </div>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-screen overflow-y-auto">

        <div className="p-4 md:p-8 lg:p-10">

          <Outlet />

        </div>
      </div>
    </div>
  );
};

export default Sidebar;