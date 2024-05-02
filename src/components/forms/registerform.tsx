import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { signupSchema } from "./validators"
import { zodResolver } from "@hookform/resolvers/zod"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { SignUpSchema } from "@/types"
import axios from "axios"

const RegisterForm = () => {
  const signIn = useSignIn()
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      confirmPassword: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    }
  })

  const onSubmit = async (data: SignUpSchema) => {
    try {
      await axios.post(`${import.meta.env.VITE_STAGING_BASE_URL}/register`, {
        username: data.username,
        password: data.password
      })

      const res = await axios.post(`${import.meta.env.VITE_STAGING_BASE_URL}/login`, {
        username: data.username,
        password: data.password
      })

      const {code, data: token, message }= res




    } catch (error) {
      console.log(error)
    }

  //   const user = decodeToken( data1)



  //   // console.log(data)
  //   return data
  }
  return (
    <div>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 sm:gap-2 min-w-64">
            <div className="flex gap-2 w-full flex-col items-stretch sm:flex-row">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="form-inputs focus-visible:ring-0" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col">
                    <FormLabel>Last Name</FormLabel>
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
            <Button type="submit" className="w-full">REGISTER</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default RegisterForm