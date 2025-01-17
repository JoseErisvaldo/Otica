import ViewStockMovements from "../../../components/layouts/admin/StockMovements/ViewStockMovements";
import LayoutAdmin from "../../../layouts/Admin";


export default function StockMovements () { 
  return(
    <LayoutAdmin>
      <div>
        <ViewStockMovements /> 
      </div>
    </LayoutAdmin>
  )
}