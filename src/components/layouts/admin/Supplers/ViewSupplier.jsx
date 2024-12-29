import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ViewSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSuppliers = async () => {
    try {
      const suppliersData = await supabaseRequest({
        table: "suppliers",
        method: "GET",
        limit: 30,
      });
      setSuppliers(suppliersData);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

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
            suppliers.map(({ id, name, whatsapp, email, cep, cd }, index) => (
              <div key={id} className="flex items-center justify-between pb-3 pt-3 last:pb-0">
                <div className="flex flex-col sm:flex-row items-center gap-x-3">
                  <Typography color="blue-gray" variant="h6">
                    {name}
                  </Typography>
                  <Typography color="blue-gray">{whatsapp}</Typography>
                  <Typography color="blue-gray">{email}</Typography>
                  <Typography color="blue-gray">{cep}</Typography>
                  <Typography color="blue-gray">{cd}</Typography>
                </div>
                <Typography color="blue-gray" variant="h6">
                  <div className="flex gap-3">
                    <Link to={`/admin/detailsSupplier/${id}`}>
                      <Button>
                        <EyeIcon className="h-6 w-6 text-white" />
                      </Button>
                    </Link>
                    <Button>Editar</Button>
                  </div>
                </Typography>
              </div>
            ))
          )}
        </div>
      </CardBody>
    </Card>
  );
}
