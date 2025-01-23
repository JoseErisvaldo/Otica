import { useEffect, useState } from "react";
import supabase from "../../../services/supabase";
import { ListAppointment } from "../../../components/layouts/admin/Appointments/listAppointment";
import { NewSchedule } from "../../../components/layouts/admin/Appointments/newSchedule";
import { Appointments } from "../../../components/layouts/admin/Appointments/appointments";
import { TableDetailedAppointments } from "../../../components/layouts/admin/Appointments/TableDetailedAppointments";
import supabaseRequest from "../../../services/api/supabaseRequest";
import { Pagination } from "../../../components/UI/admin/Pagination";
import { DrawerRight } from "../../../components/UI/admin/OpenDrawerRight";

export default function ScheduleAppointment() {
  const [appointmentNextDay, setAppointmentNextDay] = useState([]);
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

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

  async function fetchAppointments(pageNumber) {
    try {
      setLoading(true);
      const limit = 4;
      const offset = pageNumber * limit;

      const response = await supabaseRequest({
        table: "view_detailed_appointments",
        method: "GET",
        limit,
        offset,
      });
      console.log(response);
      setAppointments(response)
    } catch (error) {
      console.error("Erro ao buscar agendas:", error.message);
    } finally {
      setLoading(false);
    }
  }

  const loadNextPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchAppointments(currentPage + 1);
    }
  };

  const loadPreviousPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchAppointments(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchAppointmentsNextDay();
    fetchAppointmentsToday();
    fetchAppointments(currentPage);
  }, []);


  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="flex justify-end items-end flex-wrap w-full mr-3 gap-3">
          
          <DrawerRight>
            <NewSchedule />
            {/*
            <ListAppointment />
            */}
          </DrawerRight>
         
        </div>
        <div className="flex flex-col   m-3">
          <h2 className="text-2xl font-bold text-start">Detalhes dos agendamentos</h2>
          <div className="flex flex-wrap">
            <Appointments
              title={"Agendamentos hoje"}
              appointments={appointmentsToday}
              message={"Olá, estou passando aqui para lembrar do seu agendamento de hoje."}
            />
            <Appointments
              title={"Agendamentos amanhã"}
              appointments={appointmentNextDay}
              message={"Estou passando aqui para lembrar do seu agendamento para amanhã."}
            />
          </div>
          <div className="sm:flex">
            <TableDetailedAppointments appointments={appointments} />
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={loadNextPage}
        onPrevPage={loadPreviousPage}
      />
    </div>
  );
}
