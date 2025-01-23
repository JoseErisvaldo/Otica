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

export default function NewSupplier() {
  const [open, setOpen] = useState(false);
  const [supplierData, setSupplierData] = useState({
    name: "",
    whatsapp: "",
    cep: "",
    email: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from("suppliers")
        .insert([supplierData]);

      if (error) throw error;
      alert("Fornecedor cadastrado com sucesso!");
      setOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor:", error.message);
      alert("Erro ao cadastrar fornecedor. Tente novamente.");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient" color="white" className="border border-gray-400">
        Cadastrar Fornecedor
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Novo Fornecedor
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Cadastrar novo fornecedor
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
              Nome
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Nome do Fornecedor"
              name="name"
              value={supplierData.name}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              WhatsApp
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="WhatsApp"
              name="whatsapp"
              value={supplierData.whatsapp}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              CEP
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="CEP"
              name="cep"
              value={supplierData.cep}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Email
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Email"
              name="email"
              value={supplierData.email}
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
