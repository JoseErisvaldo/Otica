import { Stock } from "../../../components/layouts/admin/StockProducts/Stock";
import LayoutAdmin from "../../../layouts/Admin";

export default function StockProducts () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        teste
      </div>
      <div>
        <Stock />
      </div>
    </LayoutAdmin>
  )
}