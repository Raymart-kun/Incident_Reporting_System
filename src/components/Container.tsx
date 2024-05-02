import { title } from "process";
import { ReactNode } from "react";

interface ContainerProps {
  title?: string;
  children: ReactNode;
}

function Container({ children, title }: ContainerProps) {
  return (
    <div className="h-full w-full py-10 px-20 flex flex-col gap-10 overflow-y-scroll max-h-screen">
      <h1 className="self-center text-3xl font-bold">{title}</h1>
      {children}
    </div>
  );
}

export default Container;
