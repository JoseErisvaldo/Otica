import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import supabase from "../../../../services/supabase";
import supabaseRequest from "../../../../services/api/supabaseRequest";

export default function NewAppointmentsProducts() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    suppliers: ''
  });
  const [appointmentsProducts, setAppointmentsProducts] = useState([]);
  const [suppliers, setSuppliers] = useState();
  const fetchAppointmentProducts = async () => {
    try {
      const appointmentsProductsData = await supabaseRequest({
        table: "suppliers",
        method: "GET",
      });
      setSuppliers(appointmentsProductsData);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error.message);
    } finally {
    }
  };

  useEffect(() => {
    fetchAppointmentProducts();
  }, []);

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const preparedData = {
        suppliers_id: formData.suppliers
      };
      console.log(preparedData);
      const { error } = await supabase
        .from("appointments_products")
        .insert([preparedData]);

      if (error) throw error;

      alert("Agendamento cadastrado com sucesso!");
      setFormData({
        suppliers:""
      });
      setOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error.message);
      alert("Erro ao cadastrar produto. Tente novamente.");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Novo Agendamento
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Novo Agendamento
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Fornecedor
            </Typography>
            <select
              name="suppliers"
              value={formData.suppliers}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="1">Selecionar fornecedor</option>
              {suppliers && suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
          
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            Criar
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
