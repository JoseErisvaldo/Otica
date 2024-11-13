import { Button, Card } from "@material-tailwind/react";
import { Appointments } from "../../../components/layouts/admin/appointments";
import { ComplexNavbar } from "../../../components/layouts/admin/header";
import LayoutAdmin from "../../../layouts/Admin";
import { NewSchedule } from "../../../components/layouts/admin/newSchedule";
import { ListAppointment } from "../../../components/layouts/admin/listAppointment";
import SideBar from "../../../components/layouts/admin/dashboard/sideBar";
import PieChart from "../../../components/layouts/admin/dashboard/pieChart";

export default function Home () {
  return(
    <LayoutAdmin>
      
      
        <div className="flex flex-col justify-center items-center">
          
          <div className="p-3 font-bold ">
            Olá, José Erisvaldo
          </div>
          <div className="flex justify-end items-end w-full mr-3 gap-3">
            <ListAppointment />
            <NewSchedule /> 
          </div>
          <div className="flex flex-col m-3">
          <h2 className="text-2xl">Dashboard de agendamento</h2>
            <div className="sm:grid sm:grid-cols-2">
              <Appointments />
              <Appointments />
            </div>
          </div>
          <div className="sm:flex ">
            <Card >
              <SideBar/>
            </Card>
            <Card >
              <PieChart/>
            </Card>
          </div>
        </div>
    </LayoutAdmin>
  )
}