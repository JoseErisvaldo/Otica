import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { SeeSchedules } from "./seeSchedules";
import { DetailsSchedules } from "./datailsSchedules";
import WhatsAppButton from "../WhatsAppButtonProps";

export function ListAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => setOpen(!open);

  async function ViewAppointments() {
    try {
      const response = await supabaseRequest({
        table: "lens_appointments_view",
        method: "GET",
      });

      setAppointments(response);
    } catch (error) {
      console.error("Erro ao exibir os dados:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    ViewAppointments();
  }, []);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" className="flex items-center gap-3">
        <span><EyeIcon className="h-5 w-5 text-gray-500" /></span>
        Consultar agendamentos
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
          <Card>
            <CardBody>
              <div className="mb-4 flex items-center justify-between gap-3">
                <Typography variant="h5" color="blue-gray">
                  <Input type="date" />
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
                {appointments.map((appointment) => (
                  <div key={appointment.appointment_id} className="flex flex-col pb-3 pt-3 last:pb-0">
                    <div className="flex items-center gap-x-3">
                      <Card>
                        <Typography color="blue-gray" variant="h6">
                          {appointment.client_name}
                        </Typography>
                        <Typography variant="small" color="gray">
                          Criado em: {appointment.appointment_created_at} às {appointment.appointment_created_at}
                        </Typography>
                        <Typography variant="small" color="gray" className="flex">
                          {appointment.client_whatsapp} - <WhatsAppButton phoneNumber={appointment.client_whatsapp} />
                        </Typography>
                        <Typography variant="small" color="gray">
                          {appointment.appointment_date} - {appointment.appointment_time}
                        </Typography>
                        <Typography variant="small" color="gray">
                          Status: {appointment.appointment_status}
                        </Typography>
                      </Card>
                    </div>
                    <div className="flex gap-3">
                      <Typography color="blue-gray" variant="h6">
                        <DetailsSchedules appointment_id={appointment.appointment_id}/>
                      </Typography>
                      <Typography color="blue-gray" variant="h6">
                        <SeeSchedules lens_order_id={appointment.appointment_id}/>
                      </Typography>
                    </div>
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