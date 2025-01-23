
import NewDoctor from "../../../components/layouts/admin/Doctor/NewDoctor";
import ViewDoctor from "../../../components/layouts/admin/Doctor/ViewDoctor";
import LayoutAdmin from "../../../layouts/Admin";

export default function Doctor () { 
  return(
    <div className="w-full">
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        <NewDoctor />
      </div>
      <div>
        <ViewDoctor />
      </div>
    </div>
  )
}