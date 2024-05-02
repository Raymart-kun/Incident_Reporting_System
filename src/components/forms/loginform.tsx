import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginSchema } from "./validators";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import {user$} from "@/lib/states/userState";

const LoginForm = () => {
  const signIn = useSignIn()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    const res = await fetch(`${import.meta.env.VITE_STAGING_BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    })

    try {
      const { code, data } = await res.json()
      const user = await decodeToken(data)
      if (code === 200) {
        const isLoggedIn = signIn({
          auth: {
            token: data,
          },
          // refresh: 'ey....mA',
          userState: {
            user: user,
          }
        })

        if (isLoggedIn) {
          user$.user.set(user)
          user$.isLoggedIn.set(true)
          navigate("/create-report", { replace: true })
        } else {
          //Throw error
        }
      }

    } catch (error) {
      console.log(error)
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
            <Button type="submit" className="w-full bg-foreground">LOGIN </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm