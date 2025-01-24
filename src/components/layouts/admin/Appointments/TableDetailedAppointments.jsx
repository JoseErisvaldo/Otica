import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,

} from "@material-tailwind/react";
import { SeeSchedules } from "./seeSchedules";
import { DetailsSchedules } from "./datailsSchedules";
import Table, { TableHead, TableHeader, TableBody, TableRow, TableCell } from "../../../UI/admin/Table";

export function TableDetailedAppointments({ appointments = [], title, message }) {

  return (
    <Card className="m-6 w-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>

        {appointments.length > 0 ? (
          <Table>
              <TableHead>
                  <TableHeader>Data Criado</TableHeader>
                  <TableHeader>Data do Agendamento</TableHeader>
                  <TableHeader>Hora</TableHeader>
                  <TableHeader>Nome do Cliente</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Ações</TableHeader>
              </TableHead>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.appointment_id}>
                    <TableCell>{appointment.appointment_created_at}</TableCell>
                    <TableCell>{appointment.appointment_date}</TableCell>
                    <TableCell>{appointment.appointment_time}</TableCell>
                    <TableCell>{appointment.client_name}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
                    <TableCell>
                      <div className="flex  gap-3">
                        <DetailsSchedules appointment_id={appointment.appointment_id} />
                        <SeeSchedules lens_order_id={appointment.appointment_id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>Nenhum agendamento encontrado.</Typography>
          )}
      </CardBody>

    </Card>
  );
}
