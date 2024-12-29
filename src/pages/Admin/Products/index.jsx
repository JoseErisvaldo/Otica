import LayoutAdmin from "../../../layouts/Admin";


export default function Products () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        Novo Produto
      </div>
      <div>
        Ver catalogo
      </div>
    </LayoutAdmin>
  )
}