import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { DefaultSkeleton } from "../DefaultSkeleton";

export default function ClientDetails() {
  const { id } = useParams(); 
  const [client, setClient] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 


  const fetchClientDetails = async (id) => {
    try {
      const user = await supabaseRequest({
        table: "users",
        method: "GET",
        filters: { id: `eq.${id}` },
        limit: 1,
      });
      setClient(user[0]);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchClientDetails(id);
    }
  }, [id]);

  if (isLoading) {
    return <DefaultSkeleton />
  }

  if (!client) {
    return <Typography color="red">Cliente não encontrado!</Typography>;
  }

  return (
    <Card className="mx-auto">
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {client.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          {client.genero || "Gênero não informado"}
        </Typography>
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="h-5 w-5 text-blue-500" />
            <Typography color="blue-gray">{client.email || "Sem e-mail"}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-5 w-5 text-green-500" />
            <Typography color="blue-gray">{client.whatsapp || "Sem telefone"}</Typography>
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
