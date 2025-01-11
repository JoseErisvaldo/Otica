import { Alert } from "@material-tailwind/react";
 
export function AlertColors({ colorName, message }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Alert color={colorName}>{message}</Alert>
    </div>
  );
}