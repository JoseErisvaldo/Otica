import NewBrand from "../../../components/layouts/admin/Products/NewBrand";
import NewColorType from "../../../components/layouts/admin/Products/NewColorType";
import NewProduct from "../../../components/layouts/admin/Products/NewProducts";
import ViewProducts from "../../../components/layouts/admin/Products/ViewProducts";
import LayoutAdmin from "../../../layouts/Admin";
import NewProductColor from "../../../components/layouts/admin/Products/NewProductColor";


export default function Products () { 
  return(
    <LayoutAdmin>
      <div className="flex justify-center sm:justify-end flex-wrap items-end w-full mr-3 gap-3">
        <div>
          <NewBrand />
        </div>
        <div>
          <NewColorType />
        </div>
        <div>
          <NewProduct />
        </div>
        <div>
          <NewProductColor />
        </div>
      </div>
      <div>
        <ViewProducts />
      </div>
    </LayoutAdmin>
  )
}