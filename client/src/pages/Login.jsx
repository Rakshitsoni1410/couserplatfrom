import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";

import {
  Loader2,
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput({
        ...signupInput,
        [name]: value,
      });
    } else {
      setLoginInput({
        ...loginInput,
        [name]: value,
      });
    }
  };

  const handleRegistration = async (type) => {
    const inputData =
      type === "signup" ? signupInput : loginInput;

    const action =
      type === "signup" ? registerUser : loginUser;

    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }

    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }

    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [
    loginData,
    registerData,
    loginError,
    registerError,
    loginIsSuccess,
    registerIsSuccess,
    navigate,
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black px-4 py-10">

      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>
      </div>

      <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">

        <CardContent className="p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg">
              <GraduationCap className="text-white w-8 h-8" />
            </div>

            <h1 className="text-3xl font-bold text-white mt-4">
              NextSkills
            </h1>

            <p className="text-gray-300 text-sm mt-2">
              Learn • Build • Grow
            </p>
          </div>

          <Tabs defaultValue="login">

            <TabsList className="grid w-full grid-cols-2 bg-slate-800 rounded-xl p-1 mb-8">
              <TabsTrigger
                value="login"
                className="rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>

              <TabsTrigger
                value="signup"
                className="rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            {/* SIGNUP */}
            <TabsContent value="signup">

              <div className="space-y-5">

                <div>
                  <Label className="text-gray-200">
                    Full Name
                  </Label>

                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) =>
                      changeInputHandler(e, "signup")
                    }
                    placeholder="Enter your name"
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-indigo-500"
                  />
                </div>

                <div>
                  <Label className="text-gray-200">
                    Email
                  </Label>

                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) =>
                      changeInputHandler(e, "signup")
                    }
                    placeholder="Enter your email"
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-indigo-500"
                  />
                </div>

                <div className="relative">
                  <Label className="text-gray-200">
                    Password
                  </Label>

                  <Input
                    type={
                      showSignupPassword ? "text" : "password"
                    }
                    name="password"
                    value={signupInput.password}
                    onChange={(e) =>
                      changeInputHandler(e, "signup")
                    }
                    placeholder="Enter password"
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10 focus-visible:ring-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowSignupPassword(
                        !showSignupPassword
                      )
                    }
                    className="absolute right-3 top-10 text-gray-400"
                  >
                    {showSignupPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <Button
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-base font-semibold"
                  disabled={registerIsLoading}
                  onClick={() =>
                    handleRegistration("signup")
                  }
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* LOGIN */}
            <TabsContent value="login">

              <div className="space-y-5">

                <div>
                  <Label className="text-gray-200">
                    Email
                  </Label>

                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) =>
                      changeInputHandler(e, "login")
                    }
                    placeholder="Enter your email"
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-indigo-500"
                  />
                </div>

                <div className="relative">
                  <Label className="text-gray-200">
                    Password
                  </Label>

                  <Input
                    type={
                      showLoginPassword ? "text" : "password"
                    }
                    name="password"
                    value={loginInput.password}
                    onChange={(e) =>
                      changeInputHandler(e, "login")
                    }
                    placeholder="Enter password"
                    className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10 focus-visible:ring-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowLoginPassword(
                        !showLoginPassword
                      )
                    }
                    className="absolute right-3 top-10 text-gray-400"
                  >
                    {showLoginPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <div className="flex justify-end">
                  <button className="text-sm text-indigo-400 hover:text-indigo-300">
                    Forgot Password?
                  </button>
                </div>

                <Button
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-base font-semibold"
                  disabled={loginIsLoading}
                  onClick={() =>
                    handleRegistration("login")
                  }
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;