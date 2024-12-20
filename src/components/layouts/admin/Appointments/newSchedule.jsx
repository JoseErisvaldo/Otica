import React, { useState, useEffect } from "react";
import {
  Input,
  Select,
  Option,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import supabaseRequest from "../../../../services/api/supabaseRequest";

export function NewSchedule() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_doctor: "",
    date: "",
    appointment_time: "09:00",
    id_client: null,
    specialty: "",
  });
  const [clients, setClients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorSpecialties, setDoctorSpecialties] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]); // Para armazenar os horários disponíveis
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeAvailable, setIsTimeAvailable] = useState(true); // Verifica se o horário está disponível
  const [registeredTimes, setRegisteredTimes] = useState([]); 

  // Função para abrir/fechar o modal
  const handleOpen = () => setOpen(!open);

  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
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


  // Função para buscar médicos
  const fetchDoctors = async () => {
    try {
      const response = await supabaseRequest({
        table: "doctors",
        method: "GET",
      });
      setDoctors(response);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error.message);
    }
  };

  // Função para buscar especialidades de um médico
  const fetchDoctorSpecialties = async (doctorId) => {
    try {
      const response = await supabaseRequest({
        table: "doctors_specialty",
        method: "GET",
        filters: { id_doctors: `eq.${Number(doctorId)}` },
      });
      setDoctorSpecialties(response);
    } catch (error) {
      console.error("Erro ao buscar especialidades do médico:", error.message);
      setDoctorSpecialties([]); // Garantir que nunca seja undefined
    }
  };

  // Função para buscar os horários disponíveis de um médico para uma data e especialidade
  const fetchAvailableTimes = async (doctorId, specialty, date) => {
    if (!doctorId || !specialty || !date) {
      return; // Não faz sentido buscar horários sem essas informações
    }
    try {
      const response = await supabaseRequest({
        table: "appointments",
        method: "GET",
        filters: {
          id_doctor: `eq.${doctorId}`,
          specialty: `eq.${specialty}`,
          date: `eq.${date}`,
        },
      });
      console.log(response)
      return response; // Retorna os horários já agendados
    } catch (error) {
      console.error("Erro ao buscar horários do médico:", error.message);
      return []; // Retorna um array vazio em caso de erro
    }
  };
  // Função para buscar os horários disponíveis de um médico para uma data e especialidade
  const fetchDoctorSchedules = async (doctorId, specialty) => {
    if (!doctorId || !specialty) {
      return; // Não faz sentido buscar horários sem essas informações
    }
    try {
      const response = await supabaseRequest({
        table: "view_doctor_details",
        method: "GET",
        filters: {
          doctor_id: `eq.${doctorId}`,
          specialty: `eq.${specialty}`
        },
      });
      console.log("horários cadastados",response)
      setRegisteredTimes(response)
      return response; // Retorna os horários cadastados
    } catch (error) {
      console.error("Erro ao buscar horários do médico:", error.message);
      return []; // Retorna um array vazio em caso de erro
    }
  };
  useEffect(() => {
    if (formData.id_doctor && formData.specialty) {
      fetchDoctorSchedules(formData.id_doctor, formData.specialty);
    }
  }, [formData.id_doctor, formData.specialty]); // Chama quando id_doctor ou specialty mudarem
  // Função para verificar se o horário está disponível
  const checkIfTimeIsAvailable = async (doctorId, specialty, date, time) => {
    try {
      const response = await supabaseRequest({
        table: "appointments",
        method: "GET",
        filters: {
          id_doctor: `eq.${doctorId}`,
          specialty: `eq.${specialty}`,
          date: `eq.${date}`,
          appointment_time: `eq.${time}`,
        },
      });

      if (response.length > 0) {
        setIsTimeAvailable(false); // Se já houver um agendamento, o horário não está disponível
      } else {
        setIsTimeAvailable(true); // Caso contrário, o horário está disponível
      }
    } catch (error) {
      console.error("Erro ao verificar disponibilidade do horário:", error.message);
    }
  };

  // Função para manipular a seleção de um médico
  const handleDoctorSelect = async (doctorId) => {
    setFormData({ ...formData, id_doctor: doctorId, specialty: "" });
    setAvailableTimes([]); // Limpar horários disponíveis
    setDoctorSpecialties([]); // Limpar especialidades
    setIsLoading(true);

    // Buscar especialidades do médico
    await fetchDoctorSpecialties(doctorId);

    setIsLoading(false);
  };

  // Função para manipular a seleção de uma especialidade
  const handleSpecialtySelect = async (specialty) => {
    setFormData((prevData) => ({
      ...prevData,
      specialty: specialty,
    }));
    setAvailableTimes([]); // Limpar horários

    if (formData.date) {
      const availableSchedules = await fetchAvailableTimes(
        formData.id_doctor, 
        specialty,
        formData.date
      );
      console.log("availableSchedules",availableSchedules)  
      const doctorSchedules = await fetchDoctorSchedules(
        formData.id_doctor,
        specialty
      );
      console.log("doctorSchedules",doctorSchedules)
      setTeste(doctorSchedules)
      setAvailableTimes(availableSchedules); // Atualiza os horários disponíveis
    }
  };

  // Função para manipular a mudança da data
  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      date: selectedDate,
    }));

    if (formData.specialty) {
      const availableSchedules = await fetchAvailableTimes(
        formData.id_doctor,
        formData.specialty,
        selectedDate
      );
      setAvailableTimes(availableSchedules); // Atualiza os horários disponíveis
    }
  };

  // Função para manipular a mudança do horário
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      appointment_time: selectedTime,
    }));

    // Verificar se o horário está disponível
    checkIfTimeIsAvailable(formData.id_doctor, formData.specialty, formData.date, selectedTime);
  };

  // Função para enviar o agendamento
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTimeAvailable) {
      alert("O horário selecionado já está ocupado. Por favor, escolha outro horário.");
      return; // Impede o envio se o horário não estiver disponível
    }

    const validFormData = { ...formData, appointment_time: formData.appointment_time || "09:00" };

    try {
      setIsLoading(true);
      const response = await supabaseRequest({
        table: "appointments",
        method: "POST",
        data: validFormData,
      });

      console.log("Agendamento realizado com sucesso:", response);
      alert("Agendamento realizado com sucesso!");
      setOpen(false);
      setFormData({
        id_doctor: "",
        date: "",
        appointment_time: "09:00",
        id_client: null,
        specialty: "",
      });
      setAvailableTimes([]); // Limpar horários disponíveis
    } catch (error) {
      console.error("Erro ao inserir o agendamento:", error.message);
      alert("Erro ao realizar o agendamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient" className="flex items-center gap-3">
        <PlusIcon className="w-5" /> Agendar Consulta
      </Button>

      <Dialog size="sm" open={open} handler={handleOpen}>
        <DialogHeader className="relative">
          <Typography variant="h4" color="blue-gray">Agendar Consulta</Typography>
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
          <DialogBody className="space-y-4">
            <Typography variant="small" color="gray">Médico:</Typography>
            <select
              name="id_doctor"
              value={formData.id_doctor}
              onChange={(e) => handleDoctorSelect(e.target.value)}
              required
            >
              <option value="">Selecione um médico</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.first_name} {doctor.last_name}
                </option>
              ))}
            </select>

            {doctorSpecialties.length > 0 && (
              <>
                <Typography variant="small" color="gray">Especialidade:</Typography>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={(e) => handleSpecialtySelect(e.target.value)}
                  required
                >
                  <option value="">Selecione uma especialidade</option>
                  {doctorSpecialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.specialty}>
                      {specialty.specialty}
                    </option>
                  ))}
                </select>
              </>
            )}

            <Typography variant="small" color="gray">Data:</Typography>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              required
            />

            <Typography variant="small" color="gray">
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <div key={time.id} className="flex flex-col gap-2">
                    <span>Agendamentos para </span>
                    <span>{time.appointment_time}</span>
                  </div>
                ))
              ) : (
                <div value="">Nenhum agendamento</div>
              )}
            </Typography>
            <select
              name="appointment_time"
              value={formData.appointment_time}
              onChange={handleTimeChange}
              required
            >
              <option value="">Selecione o horário</option>
              {registeredTimes.length > 0 ? (
                registeredTimes.map((time) => (
                  <option key={time.doctor_id} value={time.schedule_time}>
                    {time.schedule_time}
                  </option>
                ))
              ) : (
                <option value="09:00" disabled>Não há horários disponíveis</option>
              )}
            </select>
            
          </DialogBody>

          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="gradient"
              color="green"
              disabled={isLoading || !isTimeAvailable}
            >
              {isLoading ? "Carregando..." : "Agendar"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
