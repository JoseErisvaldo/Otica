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
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import supabase from "../../../../services/supabase";

export function NewSpecialty({ doctor_id }) {

  const [open, setOpen] = useState(false);
  const [specialtyData, setSpecialtyData] = useState({
    id_doctors: doctor_id || "",
    specialty: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpecialtyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("doctors_specialty")
        .insert([specialtyData]);

      if (error) throw error;
      alert("Especialidade cadastrada com sucesso!");
      setOpen(false);
      setSpecialtyData({ id: doctor_id || "", specialty: "" });
    } catch (error) {
      console.error("Erro ao cadastrar especialidade:", error.message);
      alert("Erro ao cadastrar especialidade. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        <div className="flex items-center justify-center gap-3">
          <PlusIcon class="h-6 w-6 text-gray-500" />
          Cadastrar Especialidade
        </div>
      </Button>

      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Nova especialidade
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Cadastrar especialidade
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
              Especialidade
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Nome"
              name="specialty"
              value={specialtyData.specialty}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            className="ml-auto"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
