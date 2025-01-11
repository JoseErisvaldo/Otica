import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { DefaultSpinner } from "./Spinner";
 
export function OpenDialog({title,menssege,buttonName,onClick,isLoading}) {
  const [size, setSize] = React.useState(null);
 
  const handleOpen = (value) => setSize(value);
 
  return (
    <>
      <div className="mb-3 flex gap-3">
        <Button onClick={() => handleOpen("xs")} variant="gradient" color="green">
          {buttonName}
        </Button>
      </div>
      <Dialog
        open={
          size === "xs"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>
          {menssege}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
                onClick();
                handleOpen(null);
              }}
            className="flex gap-3 items-center" 
            disabled={isLoading}
          >
            <span>Confirmar</span>
            {isLoading && <DefaultSpinner />}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}