import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  Select,
  Option,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import supabase from "../../../../services/supabase";

export default function NewProductColor() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => setOpen(!open);

  // Fetch available products
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("id, name");

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
      alert("Erro ao carregar a lista de produtos. Tente novamente.");
    }
  };

  // Fetch available colors
  const fetchColors = async () => {
    try {
      const { data, error } = await supabase.from("products_colors_type").select("id, name");

      if (error) throw error;

      setColorOptions(data || []);
    } catch (error) {
      console.error("Erro ao buscar cores:", error.message);
      alert("Erro ao carregar as opções de cores. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchColors();
  }, []);

  const handleSubmit = async () => {
    if (isSubmitting || !selectedProduct || !selectedColor) {
      alert("Por favor, selecione um produto e uma cor.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("products_colors_stock").insert([
        { products_id: selectedProduct, id_type_color: selectedColor },
      ]);

      if (error) throw error;

      alert("Cor associada ao produto com sucesso!");
      setOpen(false);
      setSelectedProduct("");
      setSelectedColor("");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        <div className="flex items-center justify-center gap-3">

          Adicionar Cor ao Produto
        </div>
      </Button>

      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Associar Cor ao Produto
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Selecione um produto e uma cor para associar
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
          {/* Select Produto */}
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Produto
            </Typography>
            <Select
              value={selectedProduct}
              onChange={(value) => setSelectedProduct(value)}
              placeholder="Selecione um produto"
            >
              {products.map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Select Cor */}
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Cor
            </Typography>
            <Select
              value={selectedColor}
              onChange={(value) => setSelectedColor(value)}
              placeholder="Selecione uma cor"
            >
              {colorOptions.map((color) => (
                <Option key={color.id} value={color.id}>
                  {color.name}
                </Option>
              ))}
            </Select>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            className="ml-auto"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Associando..." : "Associar"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
