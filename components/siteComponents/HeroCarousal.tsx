'use client'
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { heroSlider } from "@/constants/files";
import { Button } from "@/components/ui/button"

export function HeroCarousal() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    interface Slide {
        imgUrlDesktop?: string;
        imgUrlMobile?: string;
        title: string;
        description?: string;
        buttonText?: string;
    }

    const slides: Slide[] = heroSlider.Slides;

    const renderSlide = (slide: Slide) => (
        <CarouselItem key={slide.title}>
            <div
                className="p-0 relative bg-center bg-cover"
            >
                {/* Choose image based on screen size */}
                <img
                    src={slide.imgUrlDesktop || slide.imgUrlMobile} // Use desktop image as default
                    alt={slide.title}
                    className="md:hidden block w-full h-full object-cover" // Mobile image
                />
                <img
                    src={slide.imgUrlDesktop} // Desktop image
                    alt={slide.title}
                    className="hidden md:block w-full h-full object-cover" // Desktop image
                />

                <CardContent className="flex flex-col items-center justify-center gap-5 md:gap-20 p-6 absolute top-0 w-full h-full  z-10">

                    <h2 className="text-bold text-3xl">{slide.title}</h2>

                    <p>{slide.description}</p>

                    {slide.buttonText && <Button>{slide.buttonText}</Button>}

                </CardContent>
            </div>
        </CarouselItem>
    );


    return (
        <Carousel
            className="w-full relative"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>

                {slides.map(renderSlide)}

            </CarouselContent>
            <CarouselPrevious className="absolute left-1 opacity-45" />
            <CarouselNext className="absolute right-1 opacity-45" />
        </Carousel>
    );
}
