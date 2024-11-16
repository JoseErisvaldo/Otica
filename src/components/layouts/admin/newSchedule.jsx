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

export function NewSchedule() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    optometrista: "",
    service: "",
    date: "",
    appointment_time: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Data:", formData);
  
    try {
      const response = await supabaseRequest({
        table: "appointments",
        method: "POST",
        data: formData, 
      });
  
      console.log("Dados inseridos com sucesso:", response);
      alert("Agendamento realizado com sucesso!");

      setOpen(false);
      setFormData({
        name: "",
        optometrista: "",
        service: "",
        appointment_date: "",
        appointment_time: "",
      });
    } catch (error) {
      console.error("Erro ao inserir os dados:", error.message);
      alert("Erro ao realizar o agendamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>view_lens_appointments
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
        <DialogHeader className="relative">
          <Typography variant="h4" color="blue-gray">
            Agendar
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Realizar agendamento
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
        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4 pb-6">
            <Input
              name="name"
              color="gray"
              size="lg"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
              containerProps={{ className: "!min-w-full" }}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
            <Select
              name="doctor"
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, optometrista: e })}
              required
              placeholder="Selecione um médico"
            >
              <Option value="José">José</Option>
              <Option value="Gael">Gael</Option>
            </Select>
            <Select
              name="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e })}
              required
              placeholder="Selecione um serviço"
            >
              <Option value="Exame de Vista">Exame de Vista</Option>
              <Option value="Consulta de Astigmatismo">Consulta de Astigmatismo</Option>
              <Option value="Retorno">Retorno</Option>
            </Select>
            <Input
              type="date"
              name="date"
              color="gray"
              size="lg"
              value={formData.date}
              onChange={handleChange}
              required
              containerProps={{ className: "!min-w-full" }}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
            <Select
              name="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, appointment_time: e })}
              required
              placeholder="Selecione um horário"
            >
              {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"].map((time) => (
                <Option key={time} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
          </DialogBody>
          <DialogFooter>
            <Button type="submit" className="ml-auto">
              Agendar
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
