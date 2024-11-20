import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { OpeningHours } from "./OpeningHours";

export default function ViewSpecialty({ doctor_id }) {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const doctorsData = await supabaseRequest({
        table: "doctors_specialty",
        method: "GET",
        filters: { id_doctors: `eq.${doctor_id}` },
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
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray" className="font-semibold text-xl">
          Listar Especialidades
        </Typography>
      </div>
      <div className="divide-y divide-gray-200">
        {isLoading ? (
          <div className="text-center py-4">
            <Typography variant="h6" color="gray" className="text-lg">
              Carregando...
            </Typography>
          </div>
        ) : (
          doctors.map(({ id, id_doctors,specialty }, index) => (
            <div key={id} className=" flex  justify-between py-4 px-6 rounded-lg  mb-4">
              <div className="flex flex-row sm:flex-row items-center gap-x-3">
                <Typography color="blue-gray" className="font-bold text-1xl text-center sm:text-left">
                  {specialty}
                </Typography>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <OpeningHours id_specialty={id} id_doctor={id_doctors} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
