import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import FormatPrice from "./FormatPrice";
 
export function InstallmentsModal({discounted_price, product_price}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="white" className="border border-gray-400">
        Opções de parcelamento
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Opções de parcelamento</DialogHeader>
        <DialogBody>
          <ul name="howManyTimes" id="" onChange={(e) => setHowManyTimes(e.target.value)}>
              <li >1x de {FormatPrice({value: discounted_price.toFixed(2)})} - {discounted_price.toFixed(2)}</li>
              <li >2x de {FormatPrice({value: (product_price / 2).toFixed(2)})} - sem juros</li>
              <li >3x de {FormatPrice({value: (product_price / 3).toFixed(2)})}  - sem juros</li>
              <li >4x de {FormatPrice({value: (product_price / 4).toFixed(2)})} - sem juros</li>
              <li >5x de {FormatPrice({value: (product_price / 5).toFixed(2)})} - sem juros</li>
              <li >6x de {FormatPrice({value: (product_price / 6).toFixed(2)})} - sem juros</li>
              <li >7x de {FormatPrice({value: (product_price / 7).toFixed(2)})} - sem juros</li>
              <li >8x de {FormatPrice({value: (product_price / 8).toFixed(2)})} - sem juros</li>
              <li >9x de {FormatPrice({value: (product_price / 9).toFixed(2)})} - sem juros</li>
              <li >10x de {FormatPrice({value: (product_price / 10).toFixed(2)})} - sem juros</li>
              <li >11x de {FormatPrice({value: (product_price / 11).toFixed(2)})} - sem juros</li>
              <li >12x de {FormatPrice({value: (product_price / 12).toFixed(2)})} - sem juros</li>
            </ul>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
          </Button>
          <Button variant="gradient" color="red" onClick={handleOpen}>
            <span>Fechar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}