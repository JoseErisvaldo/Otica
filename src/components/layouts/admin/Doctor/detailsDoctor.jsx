import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { DefaultSkeleton } from "../DefaultSkeleton";

export default function DetailsDoctor({ doctor_id }) {
  const [doctor, setDoctor] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  const fetchDoctorDetails = async (doctor_id) => {
    try {
      const doctorData = await supabaseRequest({
        table: "doctors",
        method: "GET",
        filters: { id: `eq.${doctor_id}` },
        limit: 1,
      });
      setDoctor(doctorData[0]);
    } catch (error) {
      console.error("Erro ao buscar médico:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (doctor_id) {
      fetchDoctorDetails(doctor_id);
    }
  }, [doctor_id]);

  if (isLoading) {
    return <DefaultSkeleton />;
  }

  if (!doctor) {
    return <Typography color="red">Médico não encontrado!</Typography>;
  }

  return (
    <Card>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {doctor.first_name} {doctor.last_name}
        </Typography>
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="h-5 w-5 text-blue-500" />
            <Typography color="blue-gray">{doctor.email || "Sem e-mail"}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-5 w-5 text-green-500" />
            <Typography color="blue-gray">{doctor.phone || "Sem telefone"}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-red-500" />
            <Typography color="blue-gray">
              {"Endereço não implementado"}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
