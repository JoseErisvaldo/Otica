import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
export function Appointments() {
  return (
    <Card className="m-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Agendamentos de hoje
        </Typography>
        <Typography className="text-2xl">
          10
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button >Ver detalhes</Button>
      </CardFooter>
    </Card>
  );
}