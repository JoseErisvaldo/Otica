import { NewCategory } from "../../../components/layouts/admin/newCategory";
import { ViewCategory } from "../../../components/layouts/admin/viewCategory";
import LayoutAdmin from "../../../layouts/Admin";

export default function CategoryOfCuts () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        <NewCategory /> 
      </div>
      <div>
        <ViewCategory/>
      </div>
    </LayoutAdmin>
  )
}