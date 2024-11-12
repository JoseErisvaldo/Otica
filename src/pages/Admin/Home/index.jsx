import { Button } from "@material-tailwind/react";
import { Appointments } from "../../../components/layouts/admin/appointments";
import { ComplexNavbar } from "../../../components/layouts/admin/header";
import LayoutAdmin from "../../../layouts/Admin";
import { NewSchedule } from "../../../components/layouts/admin/newSchedule";

export default function Home () {
  return(
    <LayoutAdmin>
      
      <ComplexNavbar/>
        <div className="flex flex-col justify-center items-center">
          
          <div className="p-3 font-bold ">
            Olá, José Erisvaldo
          </div>
          <div className="flex justify-end items-end w-full mr-3">
            <NewSchedule /> 
          </div>
          <div className="flex flex-col m-3">
          <h2 className="text-2xl">Dashboard de agendamento</h2>
            <div className="sm:grid sm:grid-cols-2">
              <Appointments />
              <Appointments />
            </div>
          </div>
          
        </div>
    </LayoutAdmin>
  )
}