import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add import for useNavigate
import { Menu, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useLogoutUserMutation } from "@/features/api/authApi"; // Correct hook import
import { toast } from "sonner";

// Import DropdownMenu components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // Check this import path

const Navbar = () => {
  const user = true; // Change to true to test dropdown (replace with actual authentication state)
  const navigate = useNavigate(); // Use useNavigate hook

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation(); // Correctly call the useLogoutUserMutation hook

  const logoutHandler = async () => {
    await logoutUser(); // Trigger the logout mutation
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully."); // Show success message after logout
      navigate("/login"); // Redirect to login page after successful logout
    }
  }, [isSuccess, data, navigate]); // Add missing dependencies to `useEffect`

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 flex items-center px-4">
      {/* Left Section (Logo & Name) - Only for Desktop */}
      <div className="hidden md:flex items-center gap-2">
        <School size={30} />
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
      </div>

      {/* Desktop View */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full w-full">
        {/* User icons and dark mode */}
        <div className="flex items-center gap-8 ml-auto">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                     src="https://github.com/shadcn.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile View */}
      <div className="w-full flex md:hidden items-center justify-between h-full px-4">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor"; // Example role, can be dynamic based on logged-in user

  return (
    <div className="z-20">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full hover:bg-gray-300"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <SheetTitle>E-Learning</SheetTitle>
            <DarkMode />
          </SheetHeader>
          <Separator className="mr-2" />
          <nav className="flex flex-col space-y-4">
            <Link to="my-learning">My Learning</Link>
            <Link to="profile">Edit Profile</Link>
            <p>Logout</p>
          </nav>
          {role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
