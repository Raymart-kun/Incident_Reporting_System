import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { signupSchema } from "./validators"
import { zodResolver } from "@hookform/resolvers/zod"

const RegisterForm = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {

    console.log(data)
    return data
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
                name="email"
                render={({ field }) => (
                  <FormItem className="flex items-start flex-col w-full">
                    <FormLabel>Email Address</FormLabel>
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