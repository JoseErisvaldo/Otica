import React, { useState, useEffect } from "react";
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

const DAYS_OF_WEEK = [
  { label: "Domingo", value: 0 },
  { label: "Segunda-feira", value: 1 },
  { label: "Terça-feira", value: 2 },
  { label: "Quarta-feira", value: 3 },
  { label: "Quinta-feira", value: 4 },
  { label: "Sexta-feira", value: 5 },
  { label: "Sábado", value: 6 },
];

export function OpeningHours({ id_specialty, id_doctor }) {
  const [open, setOpen] = useState(false);
  const [specialty, setSpecialty] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    id: null,
    doctor_id: id_doctor,
    specialty_id: id_specialty,
    day_of_week: "",
    time: "",
  });
  const [schedules, setSchedules] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Flag para saber se estamos editando

  const handleOpen = () => setOpen(!open);

  const fetchSpecialty = async (id_specialty) => {
    try {
      const { data, error } = await supabase
        .from("doctors_specialty")
        .select("id, specialty")
        .eq("id", id_specialty);

      if (error) throw error;

      setSpecialty(data || []);
    } catch (error) {
      console.error("Erro ao buscar especialidade:", error.message);
    }
  };

  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from("doctor_schedules")
        .select("id, day_of_week, time")
        .eq("doctor_id", id_doctor)
        .eq("specialty_id", id_specialty);

      if (error) throw error;

      setSchedules(data || []);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error.message);
    }
  };

  useEffect(() => {
    if (id_specialty) {
      fetchSpecialty(id_specialty);
      fetchSchedules();
    }
  }, [id_specialty, id_doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!scheduleData.day_of_week || !scheduleData.time) {
      alert("Por favor, informe o dia e o horário.");
      return;
    }

    try {
      if (isEditing) {
        // Atualizar horário
        const { error } = await supabase
          .from("doctor_schedules")
          .update({ day_of_week: scheduleData.day_of_week, time: scheduleData.time })
          .eq("id", scheduleData.id);

        if (error) throw error;
        alert("Horário atualizado com sucesso!");
      } else {
        // Inserir novo horário
        const { error } = await supabase.from("doctor_schedules").insert([scheduleData]);

        if (error) throw error;
        alert("Horário cadastrado com sucesso!");
      }
      
      setOpen(false);
      setIsEditing(false); // Resetar o estado de edição
      fetchSchedules();
    } catch (error) {
      console.error("Erro ao salvar horário:", error.message);
      alert("Erro ao salvar horário. Tente novamente.");
    }
  };

  const handleEdit = (schedule) => {
    setScheduleData({
      id: schedule.id,
      doctor_id: id_doctor,
      specialty_id: id_specialty,
      day_of_week: schedule.day_of_week,
      time: schedule.time,
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("doctor_schedules").delete().eq("id", id);

      if (error) throw error;
      alert("Horário deletado com sucesso!");
      fetchSchedules();
    } catch (error) {
      console.error("Erro ao deletar horário:", error.message);
      alert("Erro ao deletar horário. Tente novamente.");
    }
  };

  const organizedSchedules = DAYS_OF_WEEK.map((day) => ({
    ...day,
    schedules: schedules.filter((schedule) => schedule.day_of_week === day.value),
  }));

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Cadastrar Horários
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {isEditing ? "Editar Horário" : "Cadastrar Horário"}
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            {isEditing
              ? "Altere os detalhes do horário de atendimento"
              : "Informe os detalhes do horário de atendimento"}
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
          <div className="mt-4">
            {specialty.length > 0 ? (
              specialty.map((item) => (
                <div key={item.id} className="p-2">
                  <Typography className="font-bold">
                    Especialidade: {item.specialty}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography className="text-gray-500">Nenhuma especialidade encontrada.</Typography>
            )}
          </div>

          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Dia da Semana
            </Typography>
            <select
              value={scheduleData.day_of_week}
              onChange={handleChange}
              name="day_of_week"
              label="Selecione o dia"
            >
              {DAYS_OF_WEEK.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Hora
            </Typography>
            <Input
              type="time"
              color="gray"
              size="lg"
              placeholder="time"
              name="time"
              value={scheduleData.time}
              onChange={handleChange}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            {isEditing ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </DialogFooter>
        <div className="max-h-[30vh] overflow-y-auto mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {organizedSchedules.map((day) => (
          <div key={day.value} className="bg-white p-4 rounded-lg shadow-md">
            <Typography variant="h6" className="text-center text-gray-800">
              {day.label}
            </Typography>
            <div className="mt-4">
              {day.schedules.length > 0 ? (
                day.schedules.map((schedule) => (
                  <div key={schedule.id} className="text-gray-600 flex justify-between items-center">
                    <span>{schedule.time}</span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        color="blue"
                        onClick={() => handleEdit(schedule)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="red"
                        onClick={() => handleDelete(schedule.id)}
                      >
                        Deletar
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <Typography className="text-gray-500 text-center">Sem horários cadastrados</Typography>
              )}
            </div>
          </div>
        ))}
      </div>
      </Dialog>

     
    </div>
  );
}
