import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Input } from '@material-tailwind/react'
import supabaseRequest from '../../../../services/api/supabaseRequest'
import { MinusIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import FormatPrice from '../../../../utils/FormatPrice'
import { CartProducts } from '../OrderProducts/CartProducts'
import { InstallmentsModal } from '../../../../utils/InstallmentsModal'

export default function ProductsDetails() {
  const { id } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [howManyTimes, setHowManyTimes] = useState("")
  const [cart, setCart] = useState([])
  useEffect(() => {
    const storedCart = localStorage.getItem("OrderProducts")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const fetchProductDetails = async () => {
    try {
      const data = await supabaseRequest({
        table: "view_products_details",
        method: "GET",
        filters: { key_products_view: `eq.${id}` },
      })

      if (data && data.length > 0) {
        setProductDetails(data[0])
      } else {
        console.error("Produto não encontrado")
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do produto:", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [id])

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!productDetails) {
    return <div>Produto não encontrado</div>
  }

  const {
    product_id,
    product_name,
    product_price,
    product_discount_percentage,
    product_quantity_in_stock,
    product_photo_url,
    discounted_price,
    ean,
    product_brand,
    product_brand_name,
    classification,
    id_suppliers,
    supplier_name,
    id_color_name,
    color_name,
    product_material
  } = productDetails
  console.log(productDetails)
  const handleAddProductToCart = (e) => {

      const productToAdd = {  
        id,
        product_id,
        product_name,
        product_price: parseFloat(product_price.toFixed(2)),
        product_discount_percentage,
        product_quantity_in_stock,
        product_photo_url,
        discounted_price: parseFloat(discounted_price.toFixed(2)),
        ean,
        product_brand,
        product_brand_name,
        classification,
        id_suppliers,
        supplier_name,
        id_color_name,
        color_name,
        quantity,
        howManyTimes,
        product_material
      };
    
      const productExists = cart.find((item) => item.id === id && item.howManyTimes === howManyTimes);
      
  
      if (productExists) {
        const quantityStock = productDetails.product_quantity_in_stock - productExists.quantity;
        console.log(quantityStock);
    
        if (quantity > quantityStock) {
          alert("Quantidade indisponível");
          return;
        }
  
        const updatedCart = cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
    
        setCart(updatedCart);
        localStorage.setItem("OrderProducts", JSON.stringify(updatedCart));
      } else {
        // Adiciona um novo produto ao carrinho
        const updatedCart = [...cart, productToAdd];
        setCart(updatedCart);
        localStorage.setItem("OrderProducts", JSON.stringify(updatedCart));
      }
      return { ...e, cart };
  };
  

  return (
    <div className=" mx-auto px-4 py-8">
      <div className='fixed bottom-10 right-10 z-50'>
        <CartProducts />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="relative">
          <div className="sticky top-4">
            <div className="flex gap-4">
              <div className="hidden md:flex flex-col gap-4 w-20">
                <Card className="p-2 border-2 border-primary">
                  <img 
                    src={product_photo_url || "/placeholder.svg"} 
                    alt={product_name} 
                    className="w-full aspect-square object-cover"
                  />
                </Card>
              </div>
              <div className="flex-1">
                <Card className="p-4">
                  <img 
                    src={product_photo_url || "/placeholder.svg"} 
                    alt={product_name} 
                    className="w-full aspect-square object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div className="">
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-2xl font-bold">{product_name}</h1>
              <p className="font-semibold ">EAN: {ean}</p>
              <div className="font-semibold text-2xl">
                {color_name}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold">{discounted_price ? FormatPrice({value: discounted_price}) : "0.00"}</div>
            <p className="text-sm text-muted-foreground">com {product_discount_percentage}% de desconto</p>
            <p className="text-sm">ou R$ {product_price.toFixed(2)} em até 12x de R$ {(product_price / 12).toFixed(2)} sem juros no cartão</p>
            <InstallmentsModal discounted_price={discounted_price} product_price={product_price} />
          </div>
          <div>
            {product_quantity_in_stock <= 0 || product_quantity_in_stock === 0 ? (
              <p className="text-red-500">Produto indisponível</p>
            ) : (
              <p className="text-green-500">Em estoque: {product_quantity_in_stock}</p>
            )}
          </div>
          <div className='flex justify-center'>
            <div className="flex items-center gap-4">
              <Button 
                color='red'
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <MinusIcon className="h-6 w-6 text-white" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                disabled={product_quantity_in_stock <= 0 || product_quantity_in_stock === 0 || quantity >= product_quantity_in_stock} color="green"
                onClick={() => handleQuantityChange(1)}
              >
                <PlusCircleIcon className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={(e) => handleAddProductToCart(e)}
              disabled={product_quantity_in_stock <= 0 || product_quantity_in_stock === 0}
              className="flex-1" size="lg" color='green'>
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>
      <h2 className="mt-3 text-2xl font-bold mb-4">
        Detalhes
      </h2>
      <div className='flex flex-col text-start justify-start'>
        <div className="mt-2">
          <span className="font-semibold">Marca: </span>
          <span className="text-blue-600">{product_brand_name}</span>
        </div>
        <div className="mt-2">
          <span className="font-semibold">Classificação: </span>
          <span className="text-blue-600">{classification}</span>
        </div>
        <div className="mt-2">
          <span className="font-semibold">Forncedor: </span>
          <span className="text-blue-600">{supplier_name}</span>
        </div>
      </div>
    </div>
  )
}
