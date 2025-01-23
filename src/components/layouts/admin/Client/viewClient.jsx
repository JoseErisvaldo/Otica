import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../UI/admin/Table";

export function ViewClient() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = async (page) => {
    try {
      const users = await supabaseRequest({
        table: "users",
        method: "GET",
        limit: 30,
        offset: (page - 1) * 10,
      });
      setCustomers(users);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(1);
  }, []);

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
                          <Button>
                            <EyeIcon className="h-5 w-5 text-white" />
                          </Button>
                        </Link>
                        <Button>Editar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
