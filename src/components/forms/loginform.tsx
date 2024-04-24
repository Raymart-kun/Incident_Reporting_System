import Input from "@/components/Input"

const LoginForm = () => {
  return (
    <div>
      <form>
        <div className="flex flex-col gap-1 sm:gap-2 min-w-64">
          <div className="flex gap-2 flex-row">
            <Input label="Email Address" containerClass="w-full" id="email" inputClass="focus-visible:ring-0 ring-gray-100" />
          </div>
          <div className="flex gap-2 flex-row">
            <Input label="Password" containerClass="w-full" id="password" inputClass="focus-visible:ring-0 ring-gray-100" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm