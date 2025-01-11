import { Button, Card, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { OpenDialog } from "../../../UI/admin/OpenDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../../services/supabase";
import { AlertColors } from "../../../UI/admin/AlertColors";

export function CompletePurchase() {
  const navegate = useNavigate();
  const TABLE_HEAD = ["Nome", "Cor", "Quantidade", "Preço"];

  const localStorage = window.localStorage;
  const storedCart = localStorage.getItem("cartItems");
  const cartItems = storedCart ? JSON.parse(storedCart) : [];
  const [isLoading, setIsLoading] = useState(false);
  const appointments_id = cartItems[0].appointments_id;
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCompletePurchase = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    try {
      const purchase = cartItems.map((item) => ({
        appointments_id: item.appointments_id,
        key_products_view: item.key_products_view,
        id_color_name: item.id_color_name,
        product_material: item.product_material,
        id_brand: item.id_brand,
        products_id: item.product_id,
        quantity: item.quantity,
        purchase_price: item.purchase_price,
      }));

      const appointments_products_details = await supabaseRequest({
        table: "appointments_products_details",
        method: "POST",
        data: purchase,
      });

      const { data, error } = await supabase
        .from("appointments_products")
        .update({ status_id: 2 })
        .eq("id", appointments_id)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      setSuccessMessage("Compra finalizada com sucesso!");
      localStorage.removeItem("cartItems");
      navegate("/admin/appointmentsProducts");
    } catch (error) {
      setError(`Erro: ${error.message} - Detalhes: ${error.details || 'Sem detalhes disponíveis'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cartItems.map(
              ({ product_brand_name, color_name, quantity, purchase_price }, index) => {
                const isLast = index === cartItems.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={product_brand_name + color_name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product_brand_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {color_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {purchase_price}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
      {error && <AlertColors colorName={"red"} message={error} />}
      {successMessage && <AlertColors colorName={"green"} message={successMessage} />}

      <OpenDialog
        isLoading={isLoading}
        title={"Finalizar compra"}
        buttonName={"Finalizar compra"}
        onClick={handleCompletePurchase}
        menssege={"Tem certeza que deseja finalizar a compra?"}
        handleOpen={null}
      />
    </div>
  );
}
