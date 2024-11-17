import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import LayoutAdmin from "../../../layouts/Admin";
import supabaseRequest from "../../../services/api/supabaseRequest";
import { useParams } from "react-router-dom";
import ClientDetails from "../../../components/layouts/admin/Client/clientDetails";
import { SeeSchedules } from "../../../components/layouts/admin/Appointments/seeSchedules";

export default function DetailsClient() {
  const { id } = useParams();
  console.log(id);

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLensOrders = async () => {
    if (!id) {
      setError("ID do cliente não encontrado.");
      return;
    }
  
    try {
      setIsLoading(true);
      setError(null);
  
      const response = await supabaseRequest({
        table: "lens_appointments_view",
        method: "GET",
        filters: { client_id: `eq.${id}` },
      });
  
      setAppointments(response);
    } catch (error) {
      console.error("Erro ao buscar dados:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLensOrders();
    }
  }, [id]);

  return (
    <LayoutAdmin>
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        <Button variant="outlined">Some Action</Button>
      </div>
      <div>
        <ClientDetails />
      </div>
      <div className="mt-5">
        <h2 className="font-bold text-2xl">Listar Consultas</h2>
        <div className="mt-5">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">Erro: {error}</div> 
          ) : appointments.length === 0 ? (
            <div className="text-yellow-700">Não há agendamentos para este cliente.</div>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment.appointment_id} className="mb-4">
                <div className="flex flex-col items-start gap-3">
                  <div>ID: {appointment.appointment_id}</div>
                  <div>Data criado: {new Date(appointment.appointment_created_at).toLocaleDateString()}</div>
                  <div>Data do agendamento: {new Date(appointment.appointment_date).toLocaleDateString()}</div>
                  <div>Optometrista: {appointment.optometrista}</div>
                  <div>Status: {appointment.appointment_status}</div>
                  <div>Serviço: {appointment.appointment_service}</div> 
                  <div>Observações: {appointment.appointment_notes}</div> 
                </div>
                <div className="m-2 flex items-start">
                  <SeeSchedules lens_order_id={appointment.lens_order_id} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
}
