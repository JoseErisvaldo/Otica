import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import FormatPrice from "../../../../utils/FormatPrice";
import { Link } from "react-router-dom";
 
export function CartProducts() {
    const [openRight, setOpenRight] = React.useState(true);
    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false)
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const storedCart = localStorage.getItem("OrderProducts")
        setCartItems(storedCart ? JSON.parse(storedCart) : [])
      
    }, [openRight]);
    return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
        <Button color="green" onClick={openDrawerRight}><ShoppingCartIcon className="h-6 w-6 " />
        </Button>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Carrinho
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
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
        <div>
          {cartItems && cartItems.map((item) => (
            <div key={item.id} className="mb-4 flex flex-col justify-center border-b p-2">
                <div className="flex items-center justify-between gap-x-3">
                    <Avatar
                        variant="circular"
                        alt="profile picture"
                        src={item.product_photo_url}
                        className="h-10 w-10"
                    />
                    <Typography color="blue-gray" className="font-medium">
                        {item.product_name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                        {item.color_name}
                    </Typography>
                    
                </div>
                <div className="flex items-certer justify-between gap-3" >
                    <span className="font-bold">Quantidade:  </span>
                    <span>{item.quantity}</span>
                </div>
                <div className="flex items-certer justify-end gap-3" >
                  <Button variant="outlined" size="sm" color="red">
                    Remover
                  </Button>
                </div>        
              </div>
          ))}
        </div>
        <Link to="/admin/checkout" className="flex items-center justify-end gap-3 bg-green-600 text-white rounded font-bold p-2">
          Seguinte
        </Link>
      </Drawer>
    </React.Fragment>
  );
}