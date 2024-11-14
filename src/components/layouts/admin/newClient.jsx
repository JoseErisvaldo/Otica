import React, { useState } from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import supabaseRequest from "../../../services/api/supabaseRequest";

export function NewClient() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    genero: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (value) => {
    setFormData((prev) => ({ ...prev, genero: value }));
  };

  const handleSubmit = async () => {
    const { name, whatsapp, genero } = formData;

    // Validação básica
    if (!name || !whatsapp || !genero) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {

      await supabaseRequest({
        table: "users",
        method: "POST",
        data: { name, whatsapp, genero },
      });

      alert("Cliente cadastrado com sucesso!");
      setFormData({ name: "", whatsapp: "", genero: "" });
      handleOpen();
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente. Tente novamente.");
    }
  };

  return (
    <div className="">
      <Button onClick={handleOpen} variant="gradient">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Novo cliente
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Cadastrar cliente
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
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Nome
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Whatsapp
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2">
              Gênero
            </Typography>
            <Select value={formData.genero} onChange={handleSelect}>
              <Option value="Masculino">Masculino</Option>
              <Option value="Feminino">Feminino</Option>
            </Select>
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
