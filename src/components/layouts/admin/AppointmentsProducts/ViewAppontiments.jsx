import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import supabaseRequest from "../../../../services/api/supabaseRequest";

export default function ViewAppointmentsProducts() {
  const [appointmentsProducts, setAppointmentsProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointmentsProducts = async () => {
    try {
      const data = await supabaseRequest({
        table: "view_appointment_products",
        method: "GET",
      });
      setAppointmentsProducts(data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos de produtos:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsProducts();
  }, []);

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
            appointmentsProducts.map(
              ({
                appointment_product_id, 
                appointment_product_created_at,
                suppliers,
                status_name
              }) => (
                <div
                  key={appointment_product_id}
                  className=" flex flex-col justify-center items-center gap-3 sm:grid sm:grid-cols-2  pb-3 pt-3 last:pb-0"
                >
                  <div className=" flex flex-col sm:flex-row items-center gap-x-3">
                    <Typography color="blue-gray">
                      <span className="font-semibold">Data:</span> {new Date(appointment_product_created_at).toLocaleDateString("pt-BR")}
                    </Typography>
                    <Typography color="blue-gray">
                      <span className="font-semibold">Agedamento:</span> {appointment_product_id}
                    </Typography>
                    <Typography color="blue-gray">
                      <span className="font-semibold">Fornecedor:</span> {suppliers}
                    </Typography>
                    <Typography color="blue-gray" className="flex items-center gap-2">
                      <span className="font-semibold">Status:</span> <div className={` ${status_name === "Aberto" ? "text-green-500" : "text-red-500"}` }  >{status_name}</div> 
                    </Typography>
                  </div>  
                  <div className="flex justify-end gap-3">
                    <Link to={`/admin/detailsappointmentsproducts/${appointment_product_id}`}>
                      <Button color="blue">
                        <EyeIcon className="h-6 w-6 text-white" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </CardBody>
    </Card>
  );
}
