import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Textarea,
  Select,
  Option,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import supabase from "../../../../services/supabase";

export function DetailsSchedules({ appointment_id }) {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  console.log(editingStatus)
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpen = () => setOpen(!open);

  async function ViewAppointments() {
    try {
      setIsLoading(true);
      const response = await supabaseRequest({
        table: "view_detailed_appointments",
        method: "GET",
        filters: { appointment_id: `eq.${appointment_id}` },
      });

      if (response && Array.isArray(response)) {
        console.log("Agendamentos recebidos:", response);
        setAppointments(response);
      } else {
        console.error("Nenhum dado encontrado ou resposta inválida.");
        setAppointments([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateAppointment() {
    try {
      if (!editingAppointment || !editingAppointment.appointment_id) {
        throw new Error("Nenhum agendamento selecionado ou ID ausente.");
      }
  
      const { appointment_id, ...updatedFields } = editingAppointment;
  
      const { data, error } = await supabase
        .from('appointments')
        .update(updatedFields)
        .eq('id', appointment_id)
        .select();
  
      if (error) {
        throw error;
      }
  
      if (data) {
        console.log("Agendamento atualizado com sucesso:", data);
        setAppointments((prev) =>
          prev.map((appt) =>
            appt.appointment_id === appointment_id
              ? { ...appt, ...updatedFields }
              : appt
          )
        );
        alert("Agendamento atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error.message || error);
      alert("Erro ao atualizar o agendamento. Tente novamente.");
    }
  }

  async function updateStatus(appointmentId, newStatus) {
    try {
      if (!appointmentId || !newStatus) {
        throw new Error("ID ou Status inválidos.");
      }
  
      setIsUpdating(true);
      const { data, error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId)
        .select();
  
      if (error) {
        throw error;
      }
  
      if (data) {
        console.log("Status atualizado com sucesso:", data);
        setAppointments((prev) =>
          prev.map((appt) =>
            appt.appointment_id === appointmentId
              ? { ...appt, status: newStatus }
              : appt
          )
        );
        alert("Status atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      alert("Erro ao atualizar o status. Tente novamente.");
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    if (open) {
      ViewAppointments();
    }
  }, [open]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        className="flex items-center gap-3"
      >
        <EyeIcon className="h-5 w-5 text-gray-500" />
        Detalhes da agenda
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Agendamentos</DialogHeader>
        <DialogBody className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Typography variant="h6" color="gray">
                Carregando...
              </Typography>
            </div>
          ) : appointments.length > 0 ? (
            <Card>
              <CardBody>
                {appointments.map((appointment) => (
                  <div
                    key={appointment.appointment_id}
                    className="flex flex-col gap-3 mb-4 border-b pb-4"
                  >
                    <Typography color="blue-gray" variant="h6">
                      Cliente: {appointment.client_name}
                    </Typography>
                    <Input
                      label="Data"
                      type="date"
                      value={
                        editingAppointment && editingAppointment.appointment_id === appointment.appointment_id
                          ? editingAppointment.appointment_date
                          : appointment.appointment_date
                      }
                      onChange={(e) =>
                        setEditingAppointment((prev) => ({
                          ...prev,
                          appointment_id: appointment.appointment_id,
                          date: e.target.value,
                        }))
                      }
                    />

                    <Input
                      label="Horário"
                      type="time"
                      value={
                        editingAppointment && editingAppointment.appointment_id === appointment.appointment_id
                          ? editingAppointment.appointment_time
                          : appointment.appointment_time
                      }
                      onChange={(e) =>
                        setEditingAppointment((prev) => ({
                          ...prev,
                          appointment_id: appointment.appointment_id,
                          appointment_time: e.target.value,
                        }))
                      }
                    />

                    <Textarea
                      label="Observações"
                      value={
                        editingAppointment && editingAppointment.appointment_id === appointment.appointment_id
                          ? editingAppointment.observacoes
                          : appointment.observacoes
                      }
                      onChange={(e) =>
                        setEditingAppointment((prev) => ({
                          ...prev,
                          appointment_id: appointment.appointment_id,
                          observacoes: e.target.value,
                        }))
                      }
                    />
                    <Button
                      size="sm"
                      variant="gradient"
                      color="blue"
                      disabled={isUpdating}
                      onClick={updateAppointment}
                    >
                      {isUpdating ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                    <Select
                      label="Alterar Status"
                      value={
                        editingStatus && editingStatus.id === appointment.appointment_id
                          ? editingStatus.status
                          : appointment.status
                      }
                      onChange={(e) =>
                        setEditingStatus({ id: appointment.appointment_id, status: e })
                      }
                    >
                      <Option value="Agendado">Agendado</Option>
                      <Option value="Concluído">Concluído</Option>
                      <Option value="Não compareceu">Não compareceu</Option>
                      <Option value="Desistência">Desistência</Option>
                      <Option value="Cancelado">Cancelado</Option>
                    </Select>
                    <Button
                      size="sm"
                      variant="gradient"
                      color="green"
                      disabled={isUpdating}
                      onClick={() =>
                        updateStatus(
                          editingStatus?.id || appointment.appointment_id,
                          editingStatus?.status || appointment.status
                        )
                      }
                    >
                      {isUpdating ? "Alterando..." : "Alterar Status"}
                    </Button>
                  </div>
                ))}
              </CardBody>
            </Card>
          ) : (
            <Typography variant="h6" color="gray">
              Nenhum agendamento encontrado.
            </Typography>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}
