import { Card } from "@material-tailwind/react";
import AppointmentMonthDoctorPiewTotal from "../../../components/layouts/admin/dashboard/Appointments/AppointmentMonthDoctorPiewTotal ";
import AppointmentMonthDoctor from "../../../components/layouts/admin/dashboard/Appointments/AppointmentMonthDoctor";
import AppointmentMonthDoctorTotal from "../../../components/layouts/admin/dashboard/Appointments/AppointmentMonthDoctorTotal";

export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap justify-center  p-5">
        <div className=" w-[1220px] flex flex-wrap justify-center gap-5">
          
          {/* Total de Agendamentos - Pie Chart */}
          <Card className="text-xl font-semibold p-4 
          ">
            <div className="mb-4">Total de agendamentos</div>
            <AppointmentMonthDoctorPiewTotal />
          </Card>

          {/* % de agendamentos por médico - Bar Chart */}
          <Card className="text-xl font-semibold border-r-2 p-4 
          ">
            <div className="mb-4">% de agendamentos por médico</div>
            <AppointmentMonthDoctor />
          </Card>

          {/* Appointment Month Total */}
          <Card className="text-xl font-semibold p-4 
          ">
            <div className="mb-4">Agendamentos por médico</div>
            <AppointmentMonthDoctorTotal />
          </Card>
          
        </div>
      </div>
    </div>
  );
}
