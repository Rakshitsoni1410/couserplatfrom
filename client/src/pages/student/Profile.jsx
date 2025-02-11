import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row  items-center md:items-start gap-8 my-5">
        <div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Profile;



