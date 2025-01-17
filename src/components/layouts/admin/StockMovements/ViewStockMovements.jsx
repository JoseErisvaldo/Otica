import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import supabaseRequest from "../../../../services/api/supabaseRequest";


export default function ViewStockMovements () { 
    const [stockMovements, setStockMovements] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchStockMovements = async () => {
        try{
            const stockMovements = await supabaseRequest({
                table: "view_stock_movement",
                method: "GET",
            })
            setStockMovements(stockMovements)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchStockMovements()
    }, [])

    return(
        <Card>
            <CardBody>
                <div className="mb-4 flex items-center justify-certer">
                    <h1 className="text-2xl font-bold">Movimentos de Estoque</h1>
                </div>
                <div className="flex flex-row justify-center flex-wrap gap-5 ">
                    {stockMovements.map(({created_at, photo, id_movement, ean, name_products, colors_name, name_suppliers,name_type_movement,previous_quantity,moved_quantity,current_quantity}) => (
                        <div
                            key={id_movement}
                            className="border rounded-lg p-4 flex flex-col items-center  hover:shadow-lg transition-shadow"
                        >
                            <div>
                                <div className="flex flex-row items-center gap-2 justify-between">
                                    <Typography color="blue-gray">
                                        {created_at}
                                    </Typography>
                                    <Typography color="blue-gray" className="bg-blue-600 text-white px-2 py-1 rounded">
                                        {id_movement}
                                    </Typography>
                                </div>
                                <Typography color="blue-gray" >
                                    <Avatar
                                        src={photo}
                                        alt={name_products}
                                        size="xl"
                                        className="mx-auto mt-6 mb-4"
                                    />
                                </Typography>
                                <Typography color="blue-gray" variant="h6">
                                        {name_type_movement}
                                    </Typography>
                                <div className="flex gap-2 justify-between rounded p-2 text-white">
                                    <Typography color="blue-gray" variant="h6" className="flex gap-2 flex-col">
                                        <span className="font-bold">Anterior</span> 
                                        <span className="font-bold">{previous_quantity}</span>
                                    </Typography>
                                    <Typography color="blue-gray" variant="h6" className="flex gap-2 flex-col">
                                        <span className="font-bold">Movimentado</span> 
                                        <span className="font-bold">{moved_quantity}</span>
                                    </Typography>
                                    <Typography color="blue-gray" variant="h6" className="flex gap-2 flex-col">
                                        <span className="font-bold">Atual</span> 
                                        <span className="font-bold">{current_quantity}</span>
                                    </Typography>
                                </div>
                                <div className="flex flex-col items-start gap-2">
                                    <div className=" w-full flex justify-between">
                                        <Typography color="blue-gray" variant="">
                                            {name_products}
                                        </Typography>
                                        <Typography color="blue-gray" variant="">
                                            {colors_name}
                                        </Typography>
                                    </div>
                                    <Typography color="blue-gray" variant="">
                                        {ean}
                                    </Typography>
                                    
                                    <Typography color="white" className="bg-gray-600 text-white px-2 py-1 rounded">
                                        {name_suppliers}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    )}