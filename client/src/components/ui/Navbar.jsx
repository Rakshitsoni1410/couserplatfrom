import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  School,
  LayoutDashboard,
  LogOut,
  User,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import DarkMode from "@/DarkMode";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  const [logoutUser, { data, isSuccess }] =
    useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        data?.message || "Logged out successfully"
      );

      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-[#020817]/80 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-60 group-hover:opacity-100 transition duration-300"></div>

              <div className="relative p-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <School
                  size={26}
                  className="text-white"
                />
              </div>
            </div>

            <div className="leading-tight">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                nextskills
              </h1>

              <p className="hidden md:block text-[11px] uppercase tracking-[3px] text-gray-500 dark:text-gray-400">
                Learn • Build • Grow
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex items-center gap-4">
            <DarkMode />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-11 w-11 ring-2 ring-indigo-500/30 hover:ring-indigo-500 transition-all duration-300">
                    <AvatarImage
                      src={
                        user?.photoUrl ||
                        "https://github.com/shadcn.png"
                      }
                      alt="user"
                    />

                    <AvatarFallback>
                      {user?.name?.charAt(0) || "N"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl p-2">
                  <DropdownMenuLabel className="pb-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">
                        {user?.name || "User"}
                      </span>

                      <span className="text-xs text-gray-500">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup className="space-y-1">
                    <DropdownMenuItem className="rounded-xl cursor-pointer">
                      <Link
                        to="/my-learning"
                        className="flex items-center gap-2 w-full"
                      >
                        <BookOpen size={16} />
                        My Learning
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-xl cursor-pointer">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 w-full"
                      >
                        <User size={16} />
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>

                    {user?.role === "instructor" && (
                      <DropdownMenuItem className="rounded-xl cursor-pointer">
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 w-full"
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      onClick={logoutHandler}
                      className="rounded-xl cursor-pointer text-red-500 focus:text-red-500"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut size={16} />
                        Logout
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl px-5 border-gray-300 dark:border-gray-700"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  className="rounded-xl px-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300"
                  onClick={() => navigate("/login")}
                >
                  Signup
                </Button>
              </div>
            )}
          </div>

          {/* ================= MOBILE ================= */}
          <div className="flex md:hidden items-center gap-2">
            <DarkMode />

            <MobileNavbar
              user={user}
              logoutHandler={logoutHandler}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

/* ================= MOBILE NAVBAR ================= */

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <div className="z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="rounded-2xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020817]">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <SheetTitle className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              nextskills
            </SheetTitle>

            <DarkMode />
          </SheetHeader>

          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 mt-6 p-4 rounded-2xl bg-gray-100 dark:bg-gray-900">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    user?.photoUrl ||
                    "https://github.com/shadcn.png"
                  }
                />

                <AvatarFallback>
                  {user?.name?.charAt(0) || "N"}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="font-semibold">
                  {user?.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex flex-col gap-3 mt-8">
            <SheetClose asChild>
              <Link
                to="/my-learning"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
              >
                <BookOpen size={20} />
                My Learning
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
              >
                <User size={20} />
                Edit Profile
              </Link>
            </SheetClose>

            {user?.role === "instructor" && (
              <SheetClose asChild>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
              </SheetClose>
            )}
          </nav>

          {/* Footer */}
          <SheetFooter className="mt-auto">
            {user ? (
              <Button
                onClick={logoutHandler}
                variant="destructive"
                className="rounded-xl w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <Button
                  variant="outline"
                  className="rounded-xl w-full"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  className="rounded-xl w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  onClick={() => navigate("/login")}
                >
                  Signup
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};