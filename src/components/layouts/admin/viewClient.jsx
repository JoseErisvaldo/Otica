import { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../services/api/supabaseRequest";

export function ViewClient() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = async (page) => {
    try {
      const users = await supabaseRequest({
        table: "users",
        method: "GET",
        limit: 10,
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
    fetchCustomers(1); // Busca a primeira página
  }, []);

  return (
    <Card>
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Listar Clientes
          </Typography>
        </div>
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <Typography>Carregando...</Typography>
          ) : (
            customers.map(({id, name, whatsapp, genero }, index) => (
              <div
                key={id}
                className="flex items-center justify-between pb-3 pt-3 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row items-center gap-x-3">
                  <Typography color="blue-gray" variant="h6">
                    {name}
                  </Typography>
                  <Typography color="blue-gray">{whatsapp}</Typography>
                  <Typography color="blue-gray">{genero}</Typography>
                </div>
                <Typography color="blue-gray" variant="h6">
                  Editar
                </Typography>
              </div>
            ))
          )}
        </div>
      </CardBody>
    </Card>
  );
}
