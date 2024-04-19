import { Input } from "@/components/ui/input"

type Props = {
  label?: string
  containerClass?: string
  id?: string
}

const Inputs = ({ label, containerClass, id }: Props) => {
  return (
    <div className={`flex items-start flex-col ${containerClass}`}>
      <label className="my-2" htmlFor={id}>{label}</label>
      <Input className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={id} />
    </div>
  )
}

export default Inputs