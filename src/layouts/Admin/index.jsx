import { Card } from "@material-tailwind/react";

export default function LayoutAdmin ({children}) {
  return(
    <Card className="h-screen">
      {children}
    </Card>
  )
}