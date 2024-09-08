
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductProps {
  title?: String,
  price?: Number,
  imgurl?: String,
  mrp?: Number,
}



export function ProductCard01({title, price, imgurl, mrp}: ProductProps) {
  return (
    <Card className="w-full max-w-xs rounded-xl border ">
      <div className="grid gap-4 p-4">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
          <Image
            src={imgurl ?? "/placeholder.svg"}
            alt="Product image"
            width="300"
            height="400"
            className="aspect-[4/5] object-cover border w-full"
          />
        </div>
        <div className="grid gap-1.5">
          <h3 className="font-semibold text-sm md:text-base capitalize">{title || 'Acme Circles T-Shirt'}</h3>
          <p className="font-semibold text-sm md:text-base">
            ${price?.toString() || '99'} <span className="line-through ml-2 opacity-45 font-bold">${mrp?.toString() || '199'}</span>
            </p>
          <p className="text-sm md:text-base opacity-45">{'Stylish and comfortable tee for everyday wear'}</p>
        </div>
        <Button size="sm">Add to cart</Button>
      </div>
    </Card>
  )
}
