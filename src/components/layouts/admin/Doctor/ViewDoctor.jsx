import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../UI/admin/Table";
import { Pagination } from "../../../UI/admin/Pagination";

export default function ViewDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();


  const fetchDoctors = async (pageNumber) => {
    try {
      setLoading(false);
      const limit = 7;
      const offset = pageNumber * limit;
      const doctorsData = await supabaseRequest({
        table: "doctors",
        method: "GET",
        limit,
        offset
      });
      console.log(doctorsData); 
      setDoctors(doctorsData);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const loadNextPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchDoctors(currentPage + 1);
    }
  };

  const loadPreviousPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchDoctors(currentPage - 1);
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Listar Médicos
          </Typography>
        </div>
        <div className="">
          <Table>
            <TableHead>
                <TableHeader>Nome</TableHeader>
                <TableHeader>CRM</TableHeader>
                <TableHeader>Ações</TableHeader>
            </TableHead>
            <TableBody>
           {doctors.map(({ id, first_name, last_name, specialty, crm }, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Typography color="blue-gray" >
                      {first_name} {last_name}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <Typography color="blue-gray" >
                    {crm}
                  </Typography>
                </TableCell>
                <TableCell>
                <div className="flex gap-3 justify-center">
                    <Link to={`/admin/detalhesmedico/${id}`}>
                      <Button color="blue" >
                        <EyeIcon className="h-6 w-6 text-white" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))} 
            </TableBody>
          </Table>
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
