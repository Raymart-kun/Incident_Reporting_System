import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginSchema } from "./validators";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { user$ } from "@/lib/states/userState";
import axios from "axios";
import { useState } from "react";
import { SignInSchema } from "@/types";
import SubmitButton from "@/components/forms/SubmitButton";


const LoginForm = () => {
  const signIn = useSignIn()
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false);
  const form = useForm<SignInSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const handleSubmit = async (data: SignInSchema) => {
    setLoading(true);
    try {
      const { data: userData } = await axios.post(
        `${import.meta.env.VITE_STAGING_BASE_URL}/login`,
        {
          username: data.username,
          password: data.password,
        }
      );

      const { code, data: token } = userData;
      const user = await decodeToken(token);
      if (code === 200) {
        const isLoggedIn = signIn({
          auth: {
            token: token,
          },
          // refresh: 'ey....mA',
          userState: {
            user: user,
          },
        });

        if (isLoggedIn) {
          user$.user.set(user);
          user$.isLoggedIn.set(true);
          navigate("/create-report", { replace: true });
        } else {
          //Throw error
        }
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-1 sm:gap-2 min-w-64">
            <div className="flex gap-2 flex-row">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} className="form-inputs focus-visible:ring-0" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 flex-row">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" className="form-inputs focus-visible:ring-0" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton title="Login" isLoading={isLoading} />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm