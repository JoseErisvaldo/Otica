import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
  Typography,
  Avatar,
  Input,
} from "@material-tailwind/react";
 
export function ListAppointment() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const customers = [
    {
      name: "José Erisvaldo",
      whatsapp: "11958790531",
      price: 20,
      typeOfCut: 'Corte simples'
    },
    {
      name: "Gael",
      whatsapp: "11958790531",
      price: 15,
      typeOfCut: 'Corte simples'
    },
    {
      name: "José Erisvaldo",
      whatsapp: "11958790531",
      price: 30,
      typeOfCut: 'Barba'
    },
    {
      name: "José Erisvaldo",
      whatsapp: "11958790531",
      price: 30,
      typeOfCut: 'Barba'
    },
    {
      name: "José Erisvaldo",
      whatsapp: "11958790531",
      price: 30,
      typeOfCut: 'Barba'
    },
    {
      name: "José Erisvaldo",
      whatsapp: "11958790531",
      price: 30,
      typeOfCut: 'Barba'
    }
  ];
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex justify-between"> 
          <DialogHeader>Agendamentos</DialogHeader>
          <Button
              variant="text"
              color=""
              onClick={handleOpen}
              className="mr-1"
            >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </span>
            </Button>
          </div>
          <DialogBody className="overflow-y-auto max-h-[60vh]">
          <Card className="">
            <CardBody>
              <div className="mb-4 flex items-center justify-between gap-3">
                <Typography variant="h5" color="blue-gray" className="">
                  <Input type="date"></Input>
                </Typography>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue"
                  className="font-bold"
                >
                  <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </Button>
                </Typography>
              </div>
              <div className="divide-y divide-gray-200">
                {customers.map(({ name, price,whatsapp, typeOfCut }, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                  >
                    <div className="flex items-center gap-x-3">
                      <div>
                        <Typography color="blue-gray" variant="h6">
                          {name}
                        </Typography>
                        <Typography variant="small" color="gray">
                          {whatsapp}
                        </Typography>
                        <Typography variant="small" color="gray">
                          {typeOfCut}
                        </Typography>
                      </div>
                    </div>
                    <Typography color="blue-gray" variant="h6">
                      R${price}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
}