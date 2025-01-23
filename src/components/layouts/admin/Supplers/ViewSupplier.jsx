import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../UI/admin/Table";
import { Pagination } from "../../../UI/admin/Pagination";

export default function ViewSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const fetchSuppliers = async (pageNumber) => {
    try {
      setLoading(false);
      const limit = 7;
      const offset = pageNumber * limit;
      const suppliersData = await supabaseRequest({
        table: "suppliers",
        method: "GET",
        limit,
        offset
      });
      setSuppliers(suppliersData);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers(currentPage);
  }, []);

  const loadNextPage = () => {
    console.log("load next page");
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchSuppliers(currentPage + 1);
    }
  };

  const loadPreviousPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchSuppliers(currentPage - 1);
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Listar Fornecedores
          </Typography>
        </div>
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <Typography>Carregando...</Typography>
          ) : (
          <Table>
            <TableHead>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Whatsapp</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>CEP</TableHeader>
              <TableHeader>Filial</TableHeader>
              <TableHeader className="text-right">Ações</TableHeader>
            </TableHead>
            <TableBody>
              {suppliers.map(({ id, name, whatsapp, email, cep, cd }) => (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{whatsapp}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{cep}</TableCell>
                  <TableCell>{cd}</TableCell>
                  <TableCell className="text-right justify-end">
                    <span>
                      <Link to={`/admin/detalhescliente/${id}`}>
                        <Button variant="icon" color="transparent" color="blue">
                          <EyeIcon className="h-5 w-5 text-white" />
                        </Button>
                      </Link>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
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
