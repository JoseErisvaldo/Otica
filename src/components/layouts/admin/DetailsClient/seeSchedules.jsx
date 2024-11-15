import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";

export function SeeSchedules({ id }) {
  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = () => setOpen(!open);

  const fetchLensOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const users = await supabaseRequest({
        table: "lens_appointments_view",
        method: "GET",
        filters: { lens_order_id: `eq.${id}` },
      });
      setAppointment(users[0]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLensOrders();
    }
  }, [id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!appointment) {
    return <div>Sem dados para exibir</div>;
  }

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Detalhes
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Detalhes da Consulta</DialogHeader>
        <DialogBody className="max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div><strong>Nome do Paciente:</strong> {appointment.patient_name || 'Não disponível'}</div>
            <div><strong>Idade:</strong> {appointment.age || 'Não disponível'}</div>
            <div><strong>Diagnóstico:</strong> {appointment.diagnosis || 'Não disponível'}</div>
            <div><strong>Esférico (Olho Direito):</strong> {appointment.sphere_right || 'Não disponível'} dioptrias</div>
            <div><strong>Esférico (Olho Esquerdo):</strong> {appointment.sphere_left || 'Não disponível'} dioptrias</div>
            <div><strong>Cilíndrico (Olho Direito):</strong> {appointment.cylinder_right || 'Não disponível'} dioptrias</div>
            <div><strong>Cilíndrico (Olho Esquerdo):</strong> {appointment.cylinder_left || 'Não disponível'} dioptrias</div>
            <div><strong>Eixo (Olho Direito):</strong> {appointment.axis_right || 'Não disponível'}°</div>
            <div><strong>Eixo (Olho Esquerdo):</strong> {appointment.axis_left || 'Não disponível'}°</div>
            <div><strong>Adição:</strong> {appointment.addition || 'Não disponível'} dioptrias</div>
            <div><strong>Distância Naso-Pupilar (Olho Direito):</strong> {appointment.dnp_right || 'Não disponível'} mm</div>
            <div><strong>Distância Naso-Pupilar (Olho Esquerdo):</strong> {appointment.dnp_left || 'Não disponível'} mm</div>
            <div><strong>Altura da Pupila:</strong> {appointment.pupil_height || 'Não disponível'} mm</div>
            <div><strong>Tipo de Lente:</strong> {appointment.lens_type || 'Não disponível'}</div>
            <div><strong>Material da Lente:</strong> {appointment.lens_material || 'Não disponível'}</div>
            <div><strong>Índice de Refração:</strong> {appointment.refractive_index || 'Não disponível'}</div>
            <div><strong>Tratamentos Adicionais:</strong> {appointment.treatments?.join(", ") || 'Não disponível'}</div>
            <div><strong>Modelo da Armação:</strong> {appointment.frame_model || 'Não disponível'}</div>
            <div><strong>Largura da Armação:</strong> {appointment.frame_width || 'Não disponível'} mm</div>
            <div><strong>Altura da Armação:</strong> {appointment.frame_height || 'Não disponível'} mm</div>
            <div><strong>Largura da Ponte:</strong> {appointment.bridge_width || 'Não disponível'} mm</div>
            <div><strong>Comprimento das Hastas:</strong> {appointment.temple_length || 'Não disponível'} mm</div>
            <div><strong>Curvatura da Base:</strong> {appointment.base_curve || 'Não disponível'}</div>
            <div><strong>Atividades do Paciente:</strong> {appointment.activities || 'Não disponível'}</div>
            <div><strong>Preferências do Paciente:</strong> {appointment.preferences || 'Não disponível'}</div>
            <div><strong>Sensibilidade à Luz:</strong> {appointment.light_sensitivity ? "Sim" : "Não"}</div>
            <div><strong>Data de Criação:</strong> {appointment.created_at || 'Não disponível'}</div>
            <div><strong>Última Atualização:</strong> {appointment.updated_at || 'Não disponível'}</div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
