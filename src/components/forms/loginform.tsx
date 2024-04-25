import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
// import useSignIn from 'react-auth-kit/hooks/useSignIn';

const LoginForm = () => {
  // const signIn = useSignIn()
  const form = useForm()



  const handleSubmit = async () => {
    // fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email,
    //     password
    //   })
    // }).then(res => {
    //   if (res.status === 200) {
    //     if (signIn({
    //       auth: {
    //         token: 'ey....mA',
    //         type: 'Bearer'
    //       },
    //       refresh: 'ey....mA',
    //       userState: {
    //         name: 'React User',
    //         uid: 123456
    //       }
    //     })) {
    //       // Redirect or do-something
    //     } else {
    //       //Throw error
    //     }
    //     return res.json()
    //   } else {
    //     throw new Error('Login failed')
    //   }
    // })

  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-1 sm:gap-2 min-w-64">
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
            <Button type="submit" className="w-full bg-foreground">LOGIN </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm