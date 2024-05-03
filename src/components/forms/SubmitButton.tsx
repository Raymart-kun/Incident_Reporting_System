import { Button } from "@/components/ui/button"
import loadingA from "@/assets/svg/loading.svg";

const SubmitButton = ({ title, isLoading }: { title: string, isLoading?: boolean }) => {
  return (
    <Button type="submit" className="w-full bg-foreground h-11 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium transition-colors" disabled={isLoading}>
      {isLoading ? <img src={loadingA} alt="loading" /> : title}
    </Button>
  )
}

export default SubmitButton