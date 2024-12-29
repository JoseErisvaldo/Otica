import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon, IdentificationIcon } from "@heroicons/react/24/solid";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import DefaultSkeleton from "../DefaultSkeleton";

export default function DetailsSupplier({ supplier_id }) {
  const [supplier, setSupplier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSupplierDetails = async (supplier_id) => {
    try {
      const supplierData = await supabaseRequest({
        table: "suppliers",
        method: "GET",
        filters: { id: `eq.${supplier_id}` },
        limit: 1,
      });
      setSupplier(supplierData[0]);
    } catch (error) {
      console.error("Erro ao buscar fornecedor:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (supplier_id) {
      fetchSupplierDetails(supplier_id);
    }
  }, [supplier_id]);

  if (isLoading) {
    return <DefaultSkeleton />;
  }

  if (!supplier) {
    return <Typography color="red">Fornecedor não encontrado!</Typography>;
  }

  return (
    <Card>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {supplier.name || "Nome não informado"}
        </Typography>
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <IdentificationIcon className="h-5 w-5 text-blue-500" />
            <Typography color="blue-gray">Código: {supplier.cd || "Não informado"}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="h-5 w-5 text-blue-500" />
            <Typography color="blue-gray">{supplier.email || "Sem e-mail"}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-5 w-5 text-green-500" />
            <Typography color="blue-gray">{supplier.whatsapp || "Sem telefone"}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-red-500" />
            <Typography color="blue-gray">
              CEP: {supplier.cep || "Não informado"}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
