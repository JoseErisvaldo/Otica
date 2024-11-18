import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function ViewDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const doctorsData = await supabaseRequest({
        table: "doctors",
        method: "GET",
        limit: 30,
      });
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

  return (
    <Card>
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Listar Médicos
          </Typography>
        </div>
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <Typography>Carregando...</Typography>
          ) : (
            doctors.map(({ id, first_name, last_name, specialty, crm }, index) => (
              <div key={id} className="flex items-center justify-between pb-3 pt-3 last:pb-0">
                <div className="flex flex-col sm:flex-row items-center gap-x-3">
                  <Typography color="blue-gray" variant="h6">
                    {first_name} {last_name}
                  </Typography>
                  <Typography color="blue-gray">{specialty}</Typography>
                  <Typography color="blue-gray">{crm}</Typography>
                </div>
                <Typography color="blue-gray" variant="h6">
                  <div className="flex gap-3">
                    <Link to={`/admin/detalhesmedico/${id}`}>
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
