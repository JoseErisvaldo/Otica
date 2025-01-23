import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../UI/admin/Table";
import { Pagination } from "../../../UI/admin/Pagination";

export function ViewClient() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();


  const fetchCustomers = async (pageNumber) => {
    console.log(pageNumber);
    try {
      setLoading(false);
      const limit = 7;
      const offset = pageNumber * limit;

      const users = await supabaseRequest({
        table: "users",
        method: "GET",
        limit,
        offset
      });
      console.log(users);
      setCustomers(users);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage);
  }, []);

  const loadNextPage = () => {
    console.log("load next page");
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchCustomers(currentPage + 1);
    }
  };

  const loadPreviousPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchCustomers(currentPage - 1);
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Listar Clientes
          </Typography>
        </div>
        {isLoading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <div className="overflow-x-auto">
               <Table>
              <TableHead>
                <TableHeader>Nome</TableHeader>
                <TableHeader>WhatsApp</TableHeader>
                <TableHeader>Gênero</TableHeader>
                <TableHeader className="text-right">Ações</TableHeader>
              </TableHead>
              <TableBody>
                {customers.map(({ id, name, whatsapp, genero }) => (
                  <TableRow key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{whatsapp}</TableCell>
                    <TableCell>{genero}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Link to={`/admin/detalhescliente/${id}`}>
                          <Button color="blue">
                            <EyeIcon className="h-5 w-5 text-white" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
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
