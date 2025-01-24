import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import LayoutAdmin from "../../../layouts/Admin";
import supabaseRequest from "../../../services/api/supabaseRequest";
import { useParams } from "react-router-dom";
import ClientDetails from "../../../components/layouts/admin/Client/clientDetails";
import { SeeSchedules } from "../../../components/layouts/admin/Appointments/seeSchedules";
import { DetailsSchedules } from "../../../components/layouts/admin/Appointments/datailsSchedules";
import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/UI/admin/Table";
import { Pagination } from "../../../components/UI/admin/Pagination";
export default function DetailsClient() {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const fetchLensOrders = async (pageNumber) => {
    if (!id) {
      setError("ID do cliente não encontrado.");
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      setLoading(false);
      const limit = 5;
      const offset = pageNumber * limit;
      const response = await supabaseRequest({
        table: "lens_appointments_view",
        method: "GET",
        filters: { client_id: `eq.${id}` },
        limit,
        offset
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
      fetchLensOrders(currentPage);
    }
  }, [id]);

  const loadNextPage = () => {
    console.log("load next page");
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchLensOrders(currentPage + 1);
    }
  };

  const loadPreviousPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchLensOrders(currentPage - 1);
    }
  };

  return (
    <div className="w-full">
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
            <div>Carregando...</div>
          ) : error ? (
            <div className="text-red-500">Erro: {error}</div>
          ) : appointments.length === 0 ? (
            <div className="text-yellow-700">Não há agendamentos para este cliente.</div>
          ) : (
            <Table>
              <TableHead>
                <TableHeader>ID</TableHeader>
                <TableHeader>Data de Criação</TableHeader>
                <TableHeader>Data</TableHeader>
                <TableHeader>Optometrista</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Serviço</TableHeader>
                <TableHeader>Notas</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableHead>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.appointment_id}>
                    <TableCell>{appointment.appointment_id}</TableCell>
                    <TableCell>{appointment.appointment_created_at}</TableCell>
                    <TableCell>{appointment.appointment_date}</TableCell>
                    <TableCell>{appointment.optometrista}</TableCell>
                    <TableCell>{appointment.appointment_status}</TableCell>
                    <TableCell>{appointment.appointment_service}</TableCell>
                    <TableCell>{appointment.appointment_notes || "Sem notas"}</TableCell>
                    <TableCell>
                      <div className="flex gap-3 items-start">
                        <DetailsSchedules appointment_id={appointment.appointment_id} />
                        <SeeSchedules lens_order_id={appointment.lens_order_id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <div className="mt-3 p-5">
        <Pagination
          currentPage={currentPage}
              totalPages={totalPages}
              onNextPage={loadNextPage}
          onPrevPage={loadPreviousPage}
        />
      </div>
    </div>
  );
}
