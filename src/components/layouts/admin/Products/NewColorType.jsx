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

export default function NewColorType() {
  const [open, setOpen] = useState(false);
  const [colorData, setColorData] = useState({ name: "" });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("products_colors_type").insert([colorData]);

      if (error) throw error;

      alert("Cor cadastrada com sucesso!");
      setColorData({ name: "" }); // Resetar formulário
      setOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar cor:", error.message);
      alert("Erro ao cadastrar cor. Tente novamente.");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient" color="white" className="border border-gray-400">
        Cadastrar Cor
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Nova Cor
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Cadastrar nova cor de produto
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
              Nome da Cor
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Nome da Cor"
              name="name"
              value={colorData.name}
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
