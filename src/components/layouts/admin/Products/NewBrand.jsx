import React, { useState } from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import supabase from "../../../../services/supabase";

export default function NewBrand() {
  const [open, setOpen] = useState(false);
  const [brandData, setBrandData] = useState({ brand: "" });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("products_brand").insert([brandData]);

      if (error) throw error;

      alert("Marca cadastrada com sucesso!");
      setBrandData({ brand: "" }); // Resetar formulário
      setOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar marca:", error.message);
      alert("Erro ao cadastrar marca. Tente novamente.");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Cadastrar Marca
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Nova Marca
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Cadastrar nova marca de produtos
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Nome da Marca
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Nome da Marca"
              name="brand"
              value={brandData.brand}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            Cadastrar
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
