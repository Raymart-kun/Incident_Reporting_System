import Input from "@/components/Input"


const RegisterForm = () => {
  return (
    <div>
      <form>
        <div className="flex flex-col gap-2 min-w-64">
          <div className="flex gap-2 w-full flex-col items-stretch sm:flex-row">
            <Input label="First Name" id="fname" />
            <Input label="Last Name" id="lname" />
          </div>
          <div className="flex gap-2 flex-row">
            <Input label="Email Address" containerClass="w-full" id="email" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm