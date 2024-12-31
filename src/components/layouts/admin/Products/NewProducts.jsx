import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import supabase from "../../../../services/supabase";

export default function NewProduct() {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    material: "",
    suppliers: "",
    ean: ""
  });

  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const handleOpen = () => setOpen(!open);

  const fetchBrands = async () => {
    const { data, error } = await supabase.from("products_brand").select("id, brand");
    if (!error) setBrands(data);
    else console.error("Erro ao carregar marcas:", error.message);
  };

  const fetchSuppliers = async () => {
    const { data, error } = await supabase.from("suppliers").select("id, name");
    if (!error) setSuppliers(data);
    else console.error("Erro ao carregar fornecedores:", error.message);
  };

  useEffect(() => {
    fetchBrands();
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("products").insert([productData]);

      if (error) throw error;

      alert("Produto cadastrado com sucesso!");
      setProductData({
        name: "",
        brand: "",
        material: "",
        suppliers: "",
        ean: ""
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
        Cadastrar Produto
      </Button>
      <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Novo Produto
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Cadastrar novo produto
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
              EAN
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="EAN"
              type="number"
              name="ean"
              value={productData.ean}
              onChange={handleChange}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Nome do Produto
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Nome do Produto"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Marca
            </Typography>
            <Select
              label="Selecione uma marca"
              value={productData.brand}
              onChange={(value) =>
                setProductData((prevData) => ({ ...prevData, brand: value }))
              }
            >
              {brands.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.brand}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Material
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Material"
              name="material"
              value={productData.material}
              onChange={handleChange}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Fornecedor
            </Typography>
            <Select
              label="Selecione um fornecedor"
              value={productData.suppliers}
              onChange={(value) =>
                setProductData((prevData) => ({ ...prevData, suppliers: value }))
              }
            >
              {suppliers.map((supplier) => (
                <Option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </Option>
              ))}
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            Cadastrar
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
