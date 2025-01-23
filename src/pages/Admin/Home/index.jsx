import { useEffect, useState } from "react";
import supabase from "../../../services/supabase";
import { ListAppointment } from "../../../components/layouts/admin/Appointments/listAppointment";
import { NewSchedule } from "../../../components/layouts/admin/Appointments/newSchedule";
import { Appointments } from "../../../components/layouts/admin/Appointments/appointments";
import { TableDetailedAppointments } from "../../../components/layouts/admin/Appointments/TableDetailedAppointments";
import supabaseRequest from "../../../services/api/supabaseRequest";
export default function Home() {
  const [appointmentNextDay, setAppointmentNextDay] = useState([]);
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [appointments, setAppointments] = useState([]);
  console.log(appointments);
  const [loading, setLoading] = useState(true);

  async function fetchAppointmentsNextDay() {
    try {
      setLoading(true);
      const response = await supabaseRequest({
        table: "view_appointments_next_day",
        method: "GET",
      });
  
      setAppointmentNextDay(response);
    } catch (error) {
      console.error("Erro ao buscar agendas do próximo dia:", error.message);
    } finally {
      setLoading(false);
    }
  }
  
  async function fetchAppointmentsToday() {
    try {
      setLoading(true);
      const response = await supabaseRequest({
        table: "view_appointments_today",
        method: "GET",
      });
  
      setAppointmentsToday(response);
    } catch (error) {
      console.error("Erro ao buscar agendas de hoje:", error.message);
    } finally {
      setLoading(false);
    }
  }
  
  async function fetchAppointments() {
    try {
      setLoading(true);
      const response = await supabaseRequest({
        table: "view_detailed_appointments",
        method: "GET",
      });
  
      setAppointments(response);
    } catch (error) {
      console.error("Erro ao buscar todas as agendas:", error.message);
    } finally {
      setLoading(false);
    }
  }
  

  useEffect(() => {
    fetchAppointmentsNextDay();
    fetchAppointmentsToday();
    fetchAppointments();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="flex justify-end items-end flex-wrap w-full mr-3 gap-3">
          <ListAppointment />
          <NewSchedule />
        </div>
        <div className="flex flex-col m-3">
          <h2 className="text-2xl font-bold text-start">Detalhes dos agendamentos</h2>
          <div className="flex flex-wrap">
            <Appointments
              title={"Agendamentos hoje"}
              appointments={appointmentsToday}
              message={"Olá, estou passando aqui para lembra do seu agendamento de hoje"}
            />
            <Appointments
              title={"Agendamentos amanhã"}
              appointments={appointmentNextDay}
              message={"estou passando aqui para lembra do seu agendamento para amanhã"}
            />
          </div>
        </div>
        <div className="sm:flex">
          <TableDetailedAppointments appointments={appointments} />
        </div>
      </div>
    </div>
  );
}
