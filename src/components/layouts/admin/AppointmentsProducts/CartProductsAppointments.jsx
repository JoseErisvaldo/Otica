import React, { useEffect, useState } from "react";
import { Drawer, Button, Typography, IconButton, Avatar } from "@material-tailwind/react";
import FormatPrice from "../../../../utils/FormatPrice";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function CartProductsAppointments() {
  const [openRight, setOpenRight] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  function fetchCartItems() {
    const storedCart = localStorage.getItem("cartItems");
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    setCartItems(cartItems);
  }

  useEffect(() => {
    fetchCartItems();   
  }, [openRight]);
  const sumCart = cartItems.map((item) => {
    const quantity = item.quantity * item.purchase_price
    return quantity
  }).reduce((a, b) => a + b, 0)

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
        <Button variant="" onClick={openDrawerRight}> <ShoppingCartIcon class="h-6 w-6 text-white" /> </Button>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 h-full"
      >
        <div className="mb-6 flex flex-col">
            <div className="flex items-center gap-x-3">
                <Typography variant="h5" color="blue-gray">
                    Carrinho
                </Typography>
                <IconButton variant="text" color="blue-gray" onClick={closeDrawerRight}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </IconButton>
          </div>
          <div className="flex flex-col gap-x-3 bg-blue-gray-400 py-2 px-4 rounded text-white">
            <Typography variant="h6" className="flex justify-between">
                <span>Total de itens:</span>
                {cartItems.length}
            </Typography>
            <Typography variant="h6" className="flex justify-between">
                <span className="">Total de peças:</span>
                {cartItems.map((item) => item.quantity).reduce((a, b) => a + b, 0)}
            </Typography>
            <Typography variant="h6" className="flex justify-between">
                <span>Valor total:</span>
                <FormatPrice value={sumCart} />
            </Typography>
            
          </div>
          <div className="flex justify-end mt-4">
            <Link to="/admin/completeorder" className="bg-green-400 hover:text-white py-2 px-4 rounded ">Seguinte</Link>
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(80%-60px)]">
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.key_products_view}
                  className="flex items-center flex-col gap-4 border-b pb-4"
                >
                    {item.product_photo_url && (
                        <Avatar
                        src={item.product_photo_url}
                        alt={item.product_name}
                        size="sm"
                        variant="rounded"
                        />
                    )}
                    <div className="flex-1">
                        <Typography variant="h6" color="blue-gray">
                        {item.product_name}
                        </Typography>
                        <Typography color="gray">
                        Preço unitario: <FormatPrice value={item.purchase_price} />
                        </Typography>
                        <Typography color="gray">
                        Total: <FormatPrice value={item.purchase_price * item.quantity} />
                        </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button color="red" onClick={() => handleRemoveFromCart(item.key_products_view)}>
                            <MinusIcon class="h-4 w-4 text-white" />   
                        </Button>
                        <Typography color="gray" className="ml-5 mr-5">
                            {item.quantity}
                        </Typography>
                        <Button color="blue" onClick={() => handleAddToCart(item)}>
                            <PlusIcon class="h-4 w-4 text-white" />
                        </Button>
                    </div>
                </div>
              ))}
              
            </div>
          ) : (
            <Typography color="blue-gray" className="text-center mt-4">
              Carrinho vazio
            </Typography>
          )}
        </div>
      </Drawer>
    </React.Fragment>
  );
}
