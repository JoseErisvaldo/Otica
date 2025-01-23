
import NewDoctor from "../../../components/layouts/admin/Doctor/NewDoctor";
import ViewDoctor from "../../../components/layouts/admin/Doctor/ViewDoctor";
import { DrawerRight } from "../../../components/UI/admin/OpenDrawerRight";
import LayoutAdmin from "../../../layouts/Admin";

export default function Doctor () { 
  return(
    <div className="w-full">
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        <DrawerRight>
          <NewDoctor />
        </DrawerRight>
      </div>
      <div>
        <ViewDoctor />
      </div>
    </div>
  )
}