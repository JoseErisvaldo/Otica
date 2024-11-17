import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { SeeSchedules } from "./seeSchedules";
import WhatsAppButton from "../WhatsAppButtonProps";

export function Appointments({ appointments = [], title,message }) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  console.log(appointments)
  return (
    <Card className="m-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="text-2xl">
          {appointments.length}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        {/* Botão único para abrir o diálogo */}
        <Button onClick={handleOpenDialog}>
          Ver detalhes
        </Button>
      </CardFooter>

      <Dialog open={open} handler={handleCloseDialog}>
        <DialogHeader>Detalhes do Agendamento</DialogHeader>
        <DialogBody className="overflow-auto max-h-96">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.appointment_id} className="mb-4">
                <p><strong>Data Criado:</strong> {new Date(appointment.appointment_created_at).toLocaleString()}</p>
                <p><strong>Data do Agendamento:</strong> {appointment.appointment_date}</p>
                <p><strong>Hora do Agendamento:</strong> {appointment.appointment_time}</p>
                <p><strong>Nome do Cliente:</strong> {appointment.client_name}</p>
                <p className="flex gap-3">
                  <strong>WhatsApp: {appointment.client_whatsapp}</strong> 
                  <WhatsAppButton
                    phoneNumber={`55${appointment.client_whatsapp}`}
                    message={`Olá, ${appointment.client_name}, tudo bem ? ${message} ás ${appointment.appointment_time} horas. Esperamos voce !`} 
                  /></p>
                <p><strong>Status:</strong> {appointment.appointment_status}</p>  
                <p><SeeSchedules /></p>
              </div>
            ))
          ) : (
            <p>Nenhum agendamento encontrado.</p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleCloseDialog} variant="text" color="blue-gray">
            Fechar
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
