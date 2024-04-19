import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

type Props = {
  containerStyle?: string
  contentStyle?: string
  headerStyle?: string
  footerStyle?: string
  children: React.ReactNode
  header?: React.ReactNode | string
  footer?: React.ReactNode | string
}

const Cards = ({ containerStyle = "w-20 h-20", children, header, contentStyle, headerStyle, footerStyle, footer }: Props) => {
  return (
    <Card className={`p-4 ${containerStyle}`}>
      {header ?? (
        <CardHeader className={`${headerStyle}`}>
          {header}
        </CardHeader>
      )}
      <CardContent className={`${contentStyle}`}>
        {children}
      </CardContent>
      {
        footer ?? (
          <CardFooter className={`${footerStyle}`}>
            {footer}
          </CardFooter>
        )
      }
    </Card>
  )
}

export default Cards