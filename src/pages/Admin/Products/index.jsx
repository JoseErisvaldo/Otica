import NewBrand from "../../../components/layouts/admin/Products/NewBrand";
import NewColorType from "../../../components/layouts/admin/Products/NewColorType";
import NewProduct from "../../../components/layouts/admin/Products/NewProducts";
import ViewProducts from "../../../components/layouts/admin/Products/ViewProducts";
import LayoutAdmin from "../../../layouts/Admin";
import NewProductColor from "../../../components/layouts/admin/Products/NewProductColor";
import { DrawerRight } from "../../../components/UI/admin/OpenDrawerRight";


export default function Products () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-end flex-wrap items-end w-full gap-3">
        <DrawerRight > 
          <NewBrand />
          <NewColorType />
          <NewProduct />
          <NewProductColor />
        </DrawerRight>
        
      </div>
      <div className="w-full">
        <ViewProducts />
      </div>
    </LayoutAdmin>
  )
}