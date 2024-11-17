import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
 
const customers = [
  {
    name: "Tania Andrew",
    whatsapp: "tania@gmail.com",
    price: 400,
  },
  {
    name: "John Micheal",
    whatsapp: "john@gmail.com",
    price: 420,
   
  },
  {
    name: "Alexa Liras",
    price: 340,
  },
  {
    name: "Richard Gran",
    price: 520,
  },
  {
    name: "Micheal Levi",
    price: 780,
  },
];
 
export function ViewCategory() {
  return (
    <Card className="">
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="">
            Lista de categorias
          </Typography>
        </div>
        <div className="divide-y divide-gray-200">
          {customers.map(({ name, price }, index) => (
            <div
              key={index}
              className="flex items-center justify-between pb-3 pt-3 last:pb-0"
            >
              <div className="flex items-center gap-x-3">
                <div>
                  <Typography color="blue-gray" variant="h6">
                    {name}
                  </Typography>
                </div>
              </div>
              <Typography color="blue-gray" variant="h6">
                ${price}
              </Typography>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}