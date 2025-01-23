import { NewClient } from "../../../components/layouts/admin/Client/newClient";
import { ViewClient } from "../../../components/layouts/admin/Client/viewClient";


export default function Clients () { 
  return(
    <div className="w-full">
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        <NewClient /> 
      </div>
      <div>
        <ViewClient/>
      </div>
    </div>
  )
}