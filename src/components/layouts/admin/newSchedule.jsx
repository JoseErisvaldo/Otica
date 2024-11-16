import React, { useState, useEffect } from "react";
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
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import supabaseRequest from "../../../services/api/supabaseRequest";

export function NewSchedule() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    optometrista: "",
    service: "",
    date: "",
    appointment_time: "",
    id_client: null,
  });
  const [clients, setClients] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const searchClients = async (searchTerm) => {
    try {
      setIsLoading(true);
      const response = await supabaseRequest({
        table: "rpc/search_users",
        method: "POST",
        data: { search_term: searchTerm },
      });
      setClients(response);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 2) {
      searchClients(value);
    } else {
      setClients([]); 
    }
  };

  const handleClientSelect = (clientId) => {
    console.log(clientId)
    setFormData({ ...formData, id_client: clientId }); 
    setSearchTerm(""); 
    setClients([]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Data:", formData);

    const validFormData = {
      ...formData,
      appointment_time: formData.appointment_time || "09:00",
    };

    try {
      const response = await supabaseRequest({
        table: "appointments",
        method: "POST",
        data: validFormData,
      });

      console.log("Dados inseridos com sucesso:", response);
      alert("Agendamento realizado com sucesso!");

      setOpen(false);
      setFormData({
        optometrista: "",
        service: "",
        date: "",
        appointment_time: "",
        id_client: null,
      });
    } catch (error) {
      console.error("Erro ao inserir os dados:", error.message);
      alert("Erro ao realizar o agendamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient" className="flex items-center gap-3">
        <span><PlusIcon className="w-5" /> </span>Agendar Consulta
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
            {!formData.id_client && (
              <>
                <Input
                  type="text"
                  name="search_client"
                  value={searchTerm}
                  onChange={handleSearchChange}  
                  required
                  placeholder="Pesquisar cliente"
                  className="w-full"
                />
                
                {clients.length > 0 && (
                  <select
                    name="id_client"
                    value={formData.id_client || ""}
                    onChange={(e) => handleClientSelect(e.target.value)}
                    required
                    placeholder="Selecione um paciente"
                  >
                    <option>Selecionar</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
            
             {formData.id_client && (
              <>
                <Input
                  name="optometrista"
                  color="gray"
                  size="lg"
                  placeholder="Nome do Optometrista"
                  value={formData.optometrista}
                  onChange={handleChange}
                  required
                  containerProps={{ className: "!min-w-full" }}
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                />
                <Select
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
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
                  name="appointment_time"
                  value={formData.appointment_time || "09:00"}
                  onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                  required
                  placeholder="Selecione um horário"
                >
                  {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"].map((time) => (
                    <Option key={time} value={time}>
                      {time}
                    </Option>
                  ))}
                </Select>
              </>
            )}
          </DialogBody>

          <DialogFooter>
            <Button type="submit" className="ml-auto" disabled={isLoading}>
              {isLoading ? "Agendando..." : "Agendar"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
