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
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import supabase from "../../../../services/supabase";

export function NewSchedule() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_doctor: "",
    date: "",
    appointment_time: "",
    id_client: '',
    specialty: "",
  });
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctorSpecialties, setDoctorSpecialties] = useState([]);
  const [availableTimesGeneral, setAvailableTimesGeneral] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]); // Para armazenar os horários disponíveis
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeAvailable, setIsTimeAvailable] = useState(true); // Verifica se o horário está disponível
  const [registeredTimes, setRegisteredTimes] = useState([]); 
  const [dayOfWeek, setDayOfWeek] = useState(null); 

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

const handleClientSearch = async () => {
  try {
    setIsLoading(true);

    // Chamada direta ao Supabase para a função RPC
    const { data, error } = await supabase.rpc("search_users", {
      search_term: searchTerm,
    });

    if (error) {
      console.error("Erro ao buscar clientes:", error.message);
      return;
    }
    if (data && Array.isArray(data)) {
      setClients(data); // Define o estado apenas se o formato for um array
    } else {
      console.warn("Formato inesperado de resposta:", data);
      setClients([]); // Reseta o estado caso o formato não seja esperado
    }
  } catch (error) {
    console.error("Erro ao buscar clientes:", error.message);
  } finally {
    setIsLoading(false); // Finaliza o estado de carregamento
  }
};

  

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    // Checa se o input tem 2 ou mais caracteres antes de buscar
  };

  const handleClientSelect = (id) => {
    const selectedClient = clients.find((client) => client.id === id);
    setFormData((prev) => ({
      ...prev,
      id_client: id // Atualiza o ID do cliente selecionado
      
    }));
    setSearchTerm('')
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
  // Função para buscar os horários disponíveis de um médico para uma data e especialidade expesificada
  const fetchAvailableTimesGeneral = async (doctorId, specialty) => {
    if (!doctorId || !specialty) {
      return; // Não faz sentido buscar horários sem essas informações
    }
    try {
      const response = await supabaseRequest({
        table: "view_doctor_details",
        method: "GET",
        filters: {
          doctor_id: `eq.${doctorId}`,
          specialty: `eq.${specialty}`,
        },
      });
      return response; // Retorna os horários já agendados
    } catch (error) {
      console.error("Erro ao buscar horários do médico:", error.message);
      return []; // Retorna um array vazio em caso de erro
    }
  };

  // Função para buscar os horários agendado de um médico para uma data especifica
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
          date: `eq.${date}`,
          status: `eq.Agendado`,
        },
      });
      return response; // Retorna os horários já agendados
    } catch (error) {
      console.error("Erro ao buscar horários do médico:", error.message);
      return []; // Retorna um array vazio em caso de erro
    }
  };
  // Função para buscar os horários disponíveis de um médico para uma data expecifica
  const fetchDoctorSchedules = async (doctorId, specialty, dayOfWeek) => {
    if (!doctorId || !specialty) {
      return; // Não faz sentido buscar horários sem essas informações
    }
    try {
      const response = await supabaseRequest({
        table: "view_doctor_details",
        method: "GET",
        filters: {
          doctor_id: `eq.${doctorId}`,
          specialty: `eq.${specialty}`,
          day_of_week: `eq.${dayOfWeek}`
        },
      });
      setRegisteredTimes(response)
      return response; // Retorna os horários cadastados
    } catch (error) {
      console.error("Erro ao buscar horários do médico:", error.message);
      return []; // Retorna um array vazio em caso de erro
    }
  };
  useEffect(() => {
    if (formData.id_doctor && formData.specialty && dayOfWeek !== null) {
      fetchDoctorSchedules(formData.id_doctor, formData.specialty, dayOfWeek)
        .then((response) => setRegisteredTimes(response || []))
        .catch(() => setRegisteredTimes([])); // Garantir que seja limpo em caso de erro
    }
  }, [formData.id_doctor, formData.specialty, dayOfWeek]);
  ; // Chama quando id_doctor ou specialty mudarem
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
          status: `eq.Agendado`,
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
    setFormData({ ...formData, id_doctor: doctorId, specialty: "", date: "" });
    setAvailableTimes([]); // Limpar horários disponíveis
    setDoctorSpecialties([]); // Limpar especialidades
    setIsLoading(true);
    setAvailableTimesGeneral([]);
    setRegisteredTimes([]);

    // Buscar especialidades do médico
    await fetchDoctorSpecialties(doctorId);

    setIsLoading(false);
  };

  // Função para manipular a seleção de uma especialidade
  const handleSpecialtySelect = async (specialty) => {
    setRegisteredTimes([]);
    setFormData((prevData) => ({
      ...prevData,
      specialty: specialty,
      date: ""
    }));
    setAvailableTimes([]); // Limpar horários
    const availableSchedulesGeneral = await fetchAvailableTimesGeneral(
      formData.id_doctor, 
      specialty
    ); 
    setAvailableTimesGeneral(availableSchedulesGeneral) // Atualiza os horários availableSchedulesGeneral
    if (formData.date) {
      const availableSchedules = await fetchAvailableTimes(
        formData.id_doctor, 
        specialty,
        formData.date
      ); 
      const doctorSchedules = await fetchDoctorSchedules(
        formData.id_doctor,
        specialty
      );
      setAvailableTimes(availableSchedules); // Atualiza os horários disponíveis
    }
  };

  // Função para manipular a mudança da data
  const handleDateChange = async (e) => {

    console.log('entrei aqui')
    const selectedDate = e.target.value; // Data no formato yyyy-MM-dd
    const dateObject = new Date(`${selectedDate}T00:00:00`);
    const dayOfWeek = dateObject.getDay();
    // Atualiza o estado do dia da semana
    setDayOfWeek(dayOfWeek);
  
    // Atualiza o estado do formulário
    setFormData((prevData) => ({
      ...prevData,
      date: selectedDate,
    }));
    setRegisteredTimes('');
  
    // Busca horários disponíveis, se houver especialidade selecionada
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
      setAvailableTimesGeneral([])
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
      <DialogBody className="space-y-4 max-h-[500px] overflow-y-auto">
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
        <div className="w-full flex items-center justify-center p-5">
          <div className="w-96 flex flex-col gap-2 justify-center">
            <Typography variant="small" color="gray">Cliente:</Typography>
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => handleSearchChange(e.target.value)}
                  type="text"
                  placeholder="Pesquisar cliente"
                  className="w-full bg-white border border-gray-300 rounded-md p-2"
                />
                <button onClick={handleClientSearch}>
                  <MagnifyingGlassIcon className="h-11 w-11 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 p-2 rounded" />
                </button>
            </div>
            <select
              name="id_client"
              value={formData.id_client}
              onChange={(e) => handleClientSelect(e.target.value)}
              required
              className="w-full bg-white border border-gray-300 rounded-md p-2"
            >
              <option value="">Selecione um cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} - {client.whatsapp}
                </option>
              ))}
            </select>

          </div>
        </div>
        {formData.id_client && (
          <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4">
            <Typography variant="small" color="gray">Médico:</Typography>         
            <select
              name="id_doctor"
              value={formData.id_doctor}
              onChange={(e) => handleDoctorSelect(e.target.value)}
              required
              className="w-full bg-white border border-gray-300 rounded-md p-2"
            >
              <option value=""  className="w-full bg-white border border-gray-300 rounded-md p-2">Selecione um médico</option>
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
                  className="w-full bg-white border border-gray-300 rounded-md p-2"
                >
                  <option value="" className="w-full bg-white border border-gray-300 rounded-md p-2">Selecione uma especialidade</option>
                  {doctorSpecialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.specialty}>
                      {specialty.specialty}
                    </option>
                  ))}
                </select>
              </>
            )}

            {availableTimesGeneral.length > 0 && (
              <>
                <Typography variant="small" color="gray">Dia da semana e horários de atendimento:</Typography>
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col bor gap-2">
                      Domingo:
                      {availableTimesGeneral.map((time) => 
                        time.day_of_week === 0 && ( // Verifica se o dia da semana é igual a 3
                          <div key={time.id} className="flex flex-col gap-2">
                            <span>{time.schedule_time}</span>
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex flex-col bor gap-2">
                      Segunda-feira:
                      {availableTimesGeneral.map((time) => 
                        time.day_of_week === 1 && ( // Verifica se o dia da semana é igual a 3
                          <div key={time.id} className="flex flex-col gap-2">
                            <span>{time.schedule_time}</span>
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex flex-col bor gap-2">
                      Terça-feira:
                      {availableTimesGeneral.map((time) => 
                        time.day_of_week === 2 && ( // Verifica se o dia da semana é igual a 3
                          <div key={time.id} className="flex flex-col gap-2">
                            <span>{time.schedule_time}</span>
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex flex-col bor gap-2">
                      Quarta-feira:
                      {availableTimesGeneral.map((time) => 
                        time.day_of_week === 3 && ( // Verifica se o dia da semana é igual a 3
                          <div key={time.id} className="flex flex-col gap-2">
                            <span>{time.schedule_time}</span>
                          </div>
                        )
                      )}
                    </div>
                    
                  </div>
                  <div className="flex flex-row bor gap-2">
                      <div className="flex flex-col bor gap-2">
                        Quinta-feira:
                        {availableTimesGeneral.map((time) => 
                          time.day_of_week === 4 && ( // Verifica se o dia da semana é igual a 3
                            <div key={time.id} className="flex flex-col gap-2">
                              <span>{time.schedule_time}</span>
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex flex-col bor gap-2">
                        Sexta-feira:
                        {availableTimesGeneral.map((time) => 
                          time.day_of_week === 5 && ( // Verifica se o dia da semana é igual a 3
                            <div key={time.id} className="flex flex-col gap-2">
                              <span>{time.schedule_time}</span>
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex flex-col bor gap-2">
                        Sabado:
                        {availableTimesGeneral.map((time) => 
                          time.day_of_week === 5 && ( // Verifica se o dia da semana é igual a 3
                            <div key={time.id} className="flex flex-col gap-2">
                              <span>{time.schedule_time}</span>
                            </div>
                          )
                        )}
                      </div>
                  </div>
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
              {availableTimes.length > 0 ? <div className="font-bold">Horários agendados:</div> : ""}
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <div key={time.id} className="flex flex-col gap-2">
                    
                    <span>{time.specialty} - {time.appointment_time}</span>
                  </div>
                ))
              ) : (
                <div value=""></div>
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
                <option disabled>Não há horários disponíveis</option>
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
        )}   
        </DialogBody>
      </Dialog>
      
    </div>
  );
}
