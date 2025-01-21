import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";

export default function CardStockTotal({title,total,icon}) {
    return (
        <Card className="mt-6 mb-6 w-78 h-28">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                </Typography>
                <Typography textColor="gray" className="text-3xl flex justify-between">
                    {icon}
                    {total} 
                </Typography>
            </CardBody>
        </Card>
    );
}