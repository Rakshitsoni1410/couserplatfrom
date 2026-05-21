
import React, { useEffect, useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Camera,
  Loader2,
  Mail,
  ShieldCheck,
  User2,
  BookOpen,
} from "lucide-react";

import Course from "./Course";

import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";

import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { data, isLoading, refetch } =
    useLoadUserQuery();

  const [
    updateUser,
    {
      isLoading: updateUserLoading,
      isSuccess,
      isError,
      error,
    },
  ] = useUpdateUserMutation();

  // =========================================
  // Handle File Change
  // =========================================

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePhoto(file);
    }
  };

  // =========================================
  // Update Profile
  // =========================================

  const updateUserHandler = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "name",
        name || user?.name || ""
      );

      if (profilePhoto) {
        formData.append(
          "profilePhoto",
          profilePhoto
        );
      }

      await updateUser(formData);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================================
  // Effects
  // =========================================

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Profile updated successfully"
      );

      refetch();
    }

    if (isError) {
      toast.error(
        error?.data?.message ||
          "Failed to update profile"
      );
    }
  }, [isSuccess, isError]);

  // =========================================
  // Loading State
  // =========================================

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />

          <h1 className="font-semibold text-lg">
            Loading Profile...
          </h1>
        </div>
      </div>
    );
  }

  const user = data?.user;

  // =========================================
  // Error State
  // =========================================

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-red-500 text-xl font-semibold">
          Failed to load user profile
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">

      {/* ========================================= */}
      {/* Header */}
      {/* ========================================= */}

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          My Profile
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your account information.
        </p>
      </div>

      {/* ========================================= */}
      {/* Profile Card */}
      {/* ========================================= */}

      <div className="bg-white dark:bg-[#1a1a1a] border rounded-3xl shadow-sm p-6 md:p-10">

        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">

          {/* Avatar */}
          <div className="flex flex-col items-center">

            <Avatar className="h-32 w-32 border-4 border-blue-100 shadow-lg">
              <AvatarImage
                src={
                  user?.photoUrl ||
                  "https://github.com/shadcn.png"
                }
                alt={user?.name}
              />

              <AvatarFallback>
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <p className="mt-4 text-sm text-gray-500">
              Profile Photo
            </p>
          </div>

          {/* User Info */}
          <div className="flex-1 w-full">

            <div className="space-y-5">

              {/* Name */}
              <div className="flex items-center gap-3">

                <User2 className="h-5 w-5 text-blue-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <h1 className="font-semibold text-lg">
                    {user?.name}
                  </h1>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">

                <Mail className="h-5 w-5 text-green-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Email Address
                  </p>

                  <h1 className="font-semibold text-lg">
                    {user?.email}
                  </h1>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-3">

                <ShieldCheck className="h-5 w-5 text-purple-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Account Role
                  </p>

                  <h1 className="font-semibold text-lg uppercase">
                    {user?.role}
                  </h1>
                </div>
              </div>
            </div>

            {/* ========================================= */}
            {/* Edit Profile */}
            {/* ========================================= */}

            <Dialog>

              <DialogTrigger asChild>
                <Button className="mt-8 rounded-2xl">

                  <Camera className="h-4 w-4 mr-2" />

                  Edit Profile
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-lg rounded-3xl">

                <DialogHeader>

                  <DialogTitle>
                    Edit Profile
                  </DialogTitle>

                  <DialogDescription>
                    Update your profile details.
                  </DialogDescription>

                </DialogHeader>

                {/* Form */}
                <div className="space-y-5 py-4">

                  {/* Name */}
                  <div className="space-y-2">

                    <Label>Name</Label>

                    <Input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Photo */}
                  <div className="space-y-2">

                    <Label>Profile Photo</Label>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>

                {/* Footer */}
                <DialogFooter>

                  <Button
                    onClick={updateUserHandler}
                    disabled={updateUserLoading}
                    className="rounded-2xl"
                  >
                    {updateUserLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>

                </DialogFooter>

              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* Enrolled Courses */}
      {/* ========================================= */}

      <div className="mt-12">

        <div className="flex items-center gap-3 mb-6">

          <BookOpen className="text-blue-600" />

          <h1 className="text-2xl font-bold">
            Enrolled Courses
          </h1>
        </div>

        {user?.enrolledCourses?.length === 0 ? (

          <div className="bg-white dark:bg-[#1a1a1a] border rounded-3xl p-10 text-center">

            <h1 className="text-xl font-semibold mb-2">
              No Courses Enrolled
            </h1>

            <p className="text-gray-500">
              Start learning by enrolling in courses.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {user?.enrolledCourses?.map((course) => (
              <Course
                key={course._id}
                course={course}
              />
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default Profile;

