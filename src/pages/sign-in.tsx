import LoginForm from "@/components/forms/loginform";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="h-svh w-full flex justify-center items-center">
      <Card className="w-svw sm:w-[400px]">
        <CardHeader className="font-bold text-primary text-3xl">
          SIGN IN
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <span>
            Doesn't have an account?{" "}
            <NavLink to="/sign-up" className="text-blue-400">
              register
            </NavLink>
          </span>
        </CardFooter>
        {/* <Meteors number={30} /> */}
      </Card>
    </div>
  );
};

export default SignIn;
