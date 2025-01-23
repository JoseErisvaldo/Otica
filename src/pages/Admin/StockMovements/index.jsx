import ViewStockMovements from "../../../components/layouts/admin/StockMovements/ViewStockMovements";
import { DrawerRight } from "../../../components/UI/admin/OpenDrawerRight";
import LayoutAdmin from "../../../layouts/Admin";


export default function StockMovements () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-end flex-wrap items-end w-full gap-3">
        <DrawerRight>

        </DrawerRight>
      </div>
      <div>
        <ViewStockMovements /> 
      </div>
    </LayoutAdmin>
  )
}