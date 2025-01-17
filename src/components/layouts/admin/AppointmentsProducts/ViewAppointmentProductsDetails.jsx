import React, { useEffect, useState } from "react"; 
import supabaseRequest from "../../../../services/api/supabaseRequest";
import FormatPrice from "../../../../utils/FormatPrice";

export default function ViewAppointmentProductsDetails({id}) {
    const [appointmentsProductsDetails, setAppointmentsProductsDetails] = useState([]);
    const [appointmentsProducts, setAppointmentsProducts] = useState([]);

    const fetchAppointmentsProducts = async () => {
        try {
            const appoitmentsProducts = await supabaseRequest({
                table: "view_appointment_products_details",
                method: "GET", 
                filters: { appointments_id: `eq.${id}` },
            })
            setAppointmentsProductsDetails(appoitmentsProducts);

            const data = await supabaseRequest({
                table: "view_appointment_products",
                method: "GET",
                filters: { appointment_product_id: `eq.${id}` },
              });
              setAppointmentsProducts(data);
        } catch (error) {
            
        }

    };

    useEffect(() => {
        fetchAppointmentsProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalhes do Agendamento</h1>
                <div className="flex justify-between border border-gray-300 rounded-lg p-4 mb-5">
                    <div>
                        {appointmentsProducts && appointmentsProducts.length > 0 ? (
                            <div className="">
                                {appointmentsProducts.map((item) => (
                                    <div key={item.key_appointments_view} className="flex flex-col gap-2 items-start font-semibold">
                                        <div>
                                            Fornecedor: {item.suppliers}
                                        </div>
                                        <div>
                                            Data: {item.appointment_product_created_at}
                                        </div>
                                        <div>
                                            Status: {item.status_name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Nenhum agendamento encontrado.</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <span className="font-semibold">Items: {appointmentsProductsDetails.length}</span>
                        <span className="font-semibold">Peças: {appointmentsProductsDetails.map((item) => item.purchase_quantity).reduce((a, b) => a + b, 0)}</span>
                        <span className="font-semibold">Valor total: {FormatPrice({ value: appointmentsProductsDetails.map((item) => item.purchase_price).reduce((a, b) => a + b, 0) })}</span>
                    </div>
                </div>
            <div>
                <h2 className="text-xl font-bold mb-4">Produtos</h2>
                {appointmentsProductsDetails && appointmentsProductsDetails.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {appointmentsProductsDetails.map((item) => (
                            <div key={item.key_products_view} className="bg-white shadow-md rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <img
                                        src={item.product_photo_url}
                                        alt={item.product_name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="text-lg font-bold">{item.product_name}</div>
                                </div>
                                <div className="mb-3">
                                    <p><span className="font-semibold">EAN:</span> {item.ean}</p>
                                    <p><span className="font-semibold">Marca:</span> {item.product_brand_name}</p>
                                    <p><span className="font-semibold">Material:</span> {item.product_material}</p>
                                    <p><span className="font-semibold">Cor:</span> {item.color_name}</p>
                                </div>
                                <div className="mb-3">
                                    <p><span className="font-semibold">Preço de Compra:</span> {FormatPrice({ value: item.purchase_price })} </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p><span className="font-semibold">Quantidade:</span> {item.purchase_quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Nenhum produto encontrado para este agendamento.</p>
                )}
            </div>
        </div>
  );
}
