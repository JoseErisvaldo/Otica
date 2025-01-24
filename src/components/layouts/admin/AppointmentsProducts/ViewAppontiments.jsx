import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { Pagination } from "../../../UI/admin/Pagination";
import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../UI/admin/Table";

const ITEMS_PER_PAGE = 4; // Centraliza o limite para fácil manutenção

export default function ViewAppointmentsProducts() {
  const [appointmentsProducts, setAppointmentsProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(); 

  const fetchAppointmentsProducts = async (pageNumber) => {
    try {
      setLoading(false);
      const limit = 7;
      const offset = pageNumber * limit;
      const response = await supabaseRequest({
        table: "view_appointment_products",
        method: "GET",
        limit,
        offset,
      });

      setAppointmentsProducts(response);
       } catch (error) {
      console.error("Erro ao buscar agendamentos de produtos:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsProducts(currentPage);
  }, []); 

  const loadNextPage = () => {
    console.log("load next page");
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchAppointmentsProducts(currentPage + 1);
    }
  };

  const loadPreviousPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchAppointmentsProducts(currentPage - 1);
    }
  };


  return (
    <Card>
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Agendamentos de Produtos
          </Typography>
        </div>
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <Typography>Carregando...</Typography>
          ) : (
            <Table>
              <TableHead>

                  <TableHeader>Data</TableHeader>
                  <TableHeader>Suplidor</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader className="text-right">Ações</TableHeader>

              </TableHead>
              <TableBody>
                {appointmentsProducts.map(
                  ({
                    appointment_product_id,
                    appointment_product_created_at,
                    suppliers,
                    status_name,
                  }) => (
                    <TableRow key={appointment_product_id}>
                      <TableCell>
                        {appointment_product_created_at}
                      </TableCell>
                      <TableCell>{suppliers}</TableCell>
                      <TableCell>{status_name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        {status_name === "Aberto" && (
                      <Link to={`/admin/detailsappointmentsproducts/${appointment_product_id}`}>
                        <Button color="green">
                          <PencilSquareIcon class="h-6 w-6 text-white" />
                        </Button>
                      </Link>
                    )}
                    <Link to={`/admin/viewpppointmentproducts/${appointment_product_id}`}>
                      <Button color="blue">
                          <EyeIcon className="h-6 w-6 text-white" />
                      </Button>
                    </Link>
                        </div>
                    </TableCell>
                    </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
          )}
        </div>
      </CardBody>
      <div className="mt-3 p-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={loadNextPage}
          onPrevPage={loadPreviousPage}
        />
      </div>
    </Card>
  );
}
