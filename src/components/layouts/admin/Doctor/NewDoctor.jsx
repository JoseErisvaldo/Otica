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

export default function NewDoctor() {
  const [open, setOpen] = useState(false);
  const [doctorData, setDoctorData] = useState({
    first_name: "",
    last_name: "",
    crm: "",
    phone: "",
    email: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from("doctors")
        .insert([doctorData]);

      if (error) throw error;
      alert("Médico cadastrado com sucesso!");
      setOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar médico:", error.message);
      alert("Erro ao cadastrar médico. Tente novamente.");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient" color="white" className="border border-gray-400">
        Cadastrar Médico
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Novo Médico
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Cadastrar novo médico
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
              placeholder="Nome"
              name="first_name"
              value={doctorData.first_name}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Sobrenome
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Sobrenome"
              name="last_name"
              value={doctorData.last_name}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              CRM
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="CRM"
              name="crm"
              value={doctorData.crm}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Telefone
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Telefone"
              name="phone"
              value={doctorData.phone}
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
              value={doctorData.email}
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
