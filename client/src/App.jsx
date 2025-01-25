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

const Login = () => {
  return (
    <div className="flex items-center w-full justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">sign up </TabsTrigger>
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
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input type="text" placeholder=" Eg soni" required="true" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">email</Label>
                <Input
                  type="email"
                  placeholder=" Eg soni@gmail.com"
                  required="true"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="username">password</Label>
                <Input type="password" placeholder=" Eg 123" required="true" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>login </CardTitle>
              <CardDescription>
                login to your account and click to login when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  placeholder=" Eg soni@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new"> password</Label>
                <Input type="password" placeholder="eg 123" required="true" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
