import { Stock } from "../../../components/layouts/admin/StockProducts/Stock";
import { DrawerRight } from "../../../components/UI/admin/OpenDrawerRight";
import LayoutAdmin from "../../../layouts/Admin";

export default function StockProducts () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        <DrawerRight>
          
        </DrawerRight>
      </div>
      <div>
        <Stock />
      </div>
    </LayoutAdmin>
  )
}