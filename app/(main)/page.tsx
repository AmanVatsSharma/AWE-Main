import { CategorySlider01 } from "@/components/siteComponents/CategorySlider01";
import { HeroCarousal } from "@/components/siteComponents/HeroCarousal";
import Image from "next/image";
import ProductCarousal01 from "@/components/siteComponents/ProductCarousal01";
import { Separator } from "@/components/ui/separator";
import { ComplexMenu01 } from "@/components/siteComponents/ComplexMenu01";
import { TrustSection01 } from "@/components/siteComponents/TrustSection01";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { heroParallexProducts, testimonials } from "@/constants/files";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { GeminiBlock } from "@/components/siteComponents/GeminiBlock";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from 'framer-motion';
import { GlobeSection } from "@/components/siteComponents/GlobeSection";

export default function Home() {
  return (
    <main className="">
      <GeminiBlock />
      <HeroParallax products={heroParallexProducts} />
      <GlobeSection/>

      <TracingBeam>
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>


        <HeroCarousal />

        <img
          src='https://www.balwaan.com/assets/desktop/images/banner-new3.svg'
          width={1082}
          alt="banner"
          className="rounded-xl p-3 pl-0 overflow-hidden"
        />

        <img
          src="https://admin.balwaan.com/uploads/media/2024/Profile_Completion_Banner.webp"
          alt=""
          className="rounded-xl my-3 overflow-hidden w-full"
        />


        <CategorySlider01 />
        <ComplexMenu01 />
        <ProductCarousal01 />
        <Separator className="py-2 my-2" />
        <TrustSection01 />
      </TracingBeam>

    </main>
  );
}

