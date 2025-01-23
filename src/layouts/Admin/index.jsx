import { Card } from "@material-tailwind/react";

export default function LayoutAdmin({ children }) {
  return (
    <Card className="flex items-center p-5 mt-5 min-h-[850px] w-full">
      {children}
    </Card>
  );
}