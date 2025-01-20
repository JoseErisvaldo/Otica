
import { TimeLineProducts } from "../../../components/layouts/admin/CheckoutProducts/TimeLineProducts";
import ViewCheckoutProducts from "../../../components/layouts/admin/CheckoutProducts/ViewCheckoutProducts";
import NewDoctor from "../../../components/layouts/admin/Doctor/NewDoctor";
import LayoutAdmin from "../../../layouts/Admin";

export default function CheckoutProducts () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-end items-end w-full mr-3 gap-3">
        
      </div>
      <div>
        <TimeLineProducts />
      </div>
      <ViewCheckoutProducts />
    </LayoutAdmin>
  )
}