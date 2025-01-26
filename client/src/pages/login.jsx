import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = (type) => {
    if (type === "signup") {
      console.log("Signup Data:", signupInput);
      // Add your signup logic here
    } else {
      console.log("Login Data:", loginInput);
      // Add your login logic here
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-100">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click to sign up when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={signupInput.name}
                  placeholder="Eg Soni"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="Eg soni@gmail.com"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={signupInput.password}
                  placeholder="Eg 123"
                  required
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleRegistration("signup")}
              >
                Signup
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to your account and click to login when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  id="loginEmail"
                  name="email"
                  type="email"
                  value={loginInput.email}
                  placeholder="Eg soni@gmail.com"
                  onChange={(e) => changeInputHandler(e, "login")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  id="loginPassword"
                  name="password"
                  type="password"
                  value={loginInput.password}
                  placeholder="Eg 123"
                  onChange={(e) => changeInputHandler(e, "login")}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleRegistration("login")}
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
