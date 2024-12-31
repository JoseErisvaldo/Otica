import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Input } from '@material-tailwind/react'
import supabaseRequest from '../../../../services/api/supabaseRequest'

export default function ProductsDetails() {
  const { id } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [cep, setCep] = useState('')

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
    product_name,
    product_price,
    product_discount_percentage,
    product_quantity_in_stock,
    product_photo_url,
    discounted_price,
    ean,
    product_brand_name
  } = productDetails

  return (
    <div className=" mx-auto px-4 py-8">
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{product_name}</h1>
              <p className="text-sm text-muted-foreground">EAN: {ean}</p>
              <div className="mt-2">
                <span className="font-semibold">Marca: </span>
                <span className="text-blue-600">{product_brand_name}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold"> R$ {discounted_price ? discounted_price.toFixed(2) : "0.00"}</div>
            <p className="text-sm text-muted-foreground">com {product_discount_percentage}% de desconto</p>
            <p className="text-sm">ou R$ {product_price.toFixed(2)} em até 12x de R$ {(product_price / 12).toFixed(2)} sem juros no cartão</p>
          </div>
            <div className='flex items-end'>
              <h3 className="font-medium mb-2">Estoque: {product_quantity_in_stock}</h3>
            </div>
         
          <div>
            <h3 className="font-medium mb-2">Quantidade:</h3>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" size="lg">
              Comprar
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
