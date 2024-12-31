import React from "react";
import { useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import ProductsEdit from "../../../components/layouts/admin/Products/ProductsEdit";
import { Button } from "@material-tailwind/react";


export default function EditProduct() {
  const { id } = useParams(); 

  return (
    <LayoutAdmin>
      <div className="mt-3 flex justify-end gap-3">
        <Button>Foto</Button>
        <Button>Estoque</Button>
        <Button>Agendas</Button>
        <Button>Vendas</Button>
      </div>
      <div>
        <ProductsEdit product_id={id}/>
      </div>
    </LayoutAdmin>
  );
}
