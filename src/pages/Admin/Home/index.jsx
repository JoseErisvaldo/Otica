import { Button, Card } from "@material-tailwind/react";
import { Appointments } from "../../../components/layouts/admin/appointments";
import LayoutAdmin from "../../../layouts/Admin";
import { NewSchedule } from "../../../components/layouts/admin/newSchedule";
import { ListAppointment } from "../../../components/layouts/admin/listAppointment";
import SideBar from "../../../components/layouts/admin/dashboard/sideBar";
import PieChart from "../../../components/layouts/admin/dashboard/pieChart";
import { useEffect, useState } from "react";
import supabase from "../../../services/supabase";
import { Dialog } from "@material-tailwind/react"; // Para o Dialog

export default function Home() {
  const [appointmentNextDay, setAppointmentNextDay] = useState([]);
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointmentsNextDay = async () => {
    try {
      setLoading(true);
      let { data: view_appointments_next_day, error } = await supabase
        .from("view_appointments_next_day")
        .select("*");
      if (error) {
        throw new Error(error.message);
      }
      setAppointmentNextDay(view_appointments_next_day);
    } catch (error) {
      console.error("Erro ao buscar agendas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointmentsToday = async () => {
    try {
      setLoading(true);
      let { data: view_appointments_today, error } = await supabase
        .from("view_appointments_today")
        .select("*");
      if (error) {
        throw new Error(error.message);
      }
      setAppointmentsToday(view_appointments_today);
    } catch (error) {
      console.error("Erro ao buscar agendas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsNextDay();
    fetchAppointmentsToday();
  }, []);

  return (
    <LayoutAdmin>
      <div className="flex flex-col justify-center items-center">
        <div className="p-3 font-bold">Olá, José Erisvaldo</div>
        <div className="flex justify-end items-end w-full mr-3 gap-3">
          <ListAppointment />
          <NewSchedule />
        </div>
        <div className="flex flex-col m-3">
          <h2 className="text-2xl">Dashboard de agendamento</h2>
          <div className="sm:grid sm:grid-cols-2">
            <Appointments
              title={"Agendamento hoje"}
              appointments={appointmentsToday}
            />
            <Appointments
              title={"Agendamento para amanhã"}
              appointments={appointmentNextDay}
            />
          </div>
        </div>
        <div className="sm:flex">
          <Card>
            <SideBar />
          </Card>
          <Card>
            <PieChart />
          </Card>
        </div>
      </div>
    </LayoutAdmin>
  );
}
