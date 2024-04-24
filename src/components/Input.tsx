import { Input } from "@/components/ui/input"

type Props = {
  label?: string
  containerClass?: string
  inputClass?: string
  id?: string
}

const Inputs = ({ label, containerClass, id, inputClass }: Props) => {
  
  return (
    <div className={`flex items-start flex-col ${containerClass}`}>
      <label className="my-2" htmlFor={id}>{label}</label>
      <Input
        className={`shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:border-white focus:outline-none focus:shadow-outline ${inputClass}`}
        id={id}
        type={id === "password" || id === "email" ? id : "text"}
        security={id === "password" ? "true" : "false"} />
    </div>
  )
}

export default Inputs