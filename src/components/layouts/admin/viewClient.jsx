import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
 
const customers = [
  {
    name: "Tania Andrew",
    whatsapp: "1234564",
    genero: 'Feminino',
  },
  {
    name: "John Micheal",
    whatsapp: "412345646",
    genero: 'Masculino',
   
  },
  {
    name: "Alexa Liras",
    whatsapp: "412345646",
    genero: 'Feminino',
  },
  {
    name: "Richard Gran",
    whatsapp: "412345646",
    genero: 520,
  },
  {
    name: "Micheal Levi",
    whatsapp: "412345646",
    genero: 'Masculino',
  },
];
 
export function ViewClient() {
  return (
    <Card className="">
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="">
            Listar Clientes
          </Typography>
        </div>
        <div className="divide-y divide-gray-200">
          {customers.map(({ name,whatsapp, genero }, index) => (
            <div
              key={index}
              className="flex items-center justify-between pb-3 pt-3 last:pb-0"
            >
              <div className="flex flex-col sm:flex-row items-center gap-x-3">
                <div>
                  <Typography color="blue-gray" variant="h6">
                    {name}
                  </Typography>
                </div>
                <div>
                  {whatsapp}
                </div>
                <div>{genero}</div>
              </div>
              <Typography color="blue-gray" variant="h6">
                Editar
              </Typography>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}