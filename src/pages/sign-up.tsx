import RegisterForm from '@/components/forms/registerform'
import {Card, CardContent, CardHeader} from '@/components/ui/card'

const SignUp = () => {

  return (
    <div className="h-svh w-full flex justify-center items-center">
      <Card className='w-svw sm:w-[400px]'>
        <CardHeader className="font-bold text-primary text-3xl">
          SIGN UP
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp