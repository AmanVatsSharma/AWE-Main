import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Categories } from "@/constants/files"

interface Category {
    name: string;
    description: string;
    imgUrl: string;
}

export function CategoriesSlider() {
    return (
        <>
            <h3 className="text-3xl font-bold text-primary underline text-center p-3 md:p-10">Categories </h3>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full px-3 md:px-10 relative"
            >
                <CarouselContent>
                    {/* {Categories.map((category) => (
                        <CarouselItem key={category.name} className="md:basis-1/6 basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-2">
                                        <img src={category.imgUrl} alt={category.name} width={45} height={45} />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))} */}

                    {Array.from({ length: 12 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/6 basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-3xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <CarouselPrevious className="absolute left-3 opacity-50" />
                <CarouselNext className="absolute right-3 opacity-50" />
            </Carousel>
        </>
    )
}
