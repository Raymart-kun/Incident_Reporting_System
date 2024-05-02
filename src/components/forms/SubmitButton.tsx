import { Button } from "@/components/ui/button"
import loadingA from "@/assets/svg/loading.svg";

const SubmitButton = ({ title, isLoading }: { title: string, isLoading: boolean }) => {
  return (
    <Button type="submit" className="w-full bg-foreground" disabled={isLoading}>
      {isLoading ? <img src={loadingA} alt="loading" /> : title}
    </Button>
  )
}

export default SubmitButton