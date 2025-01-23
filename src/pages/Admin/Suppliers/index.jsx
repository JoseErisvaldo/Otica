import LayoutAdmin from "../../../layouts/Admin";
import NewSupplier from "../../../components/layouts/admin/Supplers/NewSupplier";
import ViewSupplier from "../../../components/layouts/admin/Supplers/ViewSupplier";

export default function Suppliers () { 
  return(
    <div className="w-full">
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        <NewSupplier />
      </div>
      <div>
        <ViewSupplier />
      </div>
    </div>
  )
}