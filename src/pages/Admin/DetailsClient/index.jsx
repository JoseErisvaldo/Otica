import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import ClientDetails from "../../../components/layouts/admin/clientDetails";
import LayoutAdmin from "../../../layouts/Admin";
import { SeeSchedules } from "../../../components/layouts/admin/DetailsClient/seeSchedules";
import supabaseRequest from "../../../services/api/supabaseRequest";
import { useParams } from "react-router-dom";

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
        filters: { lens_order_id: `eq.${id}` },
      });

      console.log(response);
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
            <div className="text-yellow-500">Não há agendamentos para este cliente.</div>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment.appointment_id}>
                <div className="flex flex-col items-start gap-3">
                  <div>ID: {appointment.appointment_id}</div>
                  <div>Data: {new Date(appointment.appointment_date).toLocaleDateString()}</div>
                  <div>Optometrista: {appointment.optometrista}</div>
                  <div>Status: {appointment.status}</div>
                  <div>Serviço: {appointment.servico}</div>
                  <div>Observações: {appointment.observacoes}</div>
                </div>
                <div className="m-2 flex items-start">
                  <SeeSchedules id={appointment.lens_order_id} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
}