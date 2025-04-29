
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Lightbox from "yet-another-react-lightbox"; // Using a lightbox library
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
     // Ensure first thumbnail is selected on init
     if (thumbApi) {
        thumbApi.scrollTo(0);
     }
  }, [mainApi, thumbApi, onSelect]);

  const lightboxSlides = images.map(src => ({ src }));

  return (
    <div className="space-y-4">
       {/* Main Image Carousel */}
       <Carousel setApi={setMainApi} className="w-full group relative">
        <CarouselContent>
          {images.map((imgSrc, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden border rounded-lg shadow-sm">
                 <CardContent className="p-0">
                    <AspectRatio ratio={1 / 1} onClick={() => setLightboxOpen(true)} className="cursor-zoom-in">
                        <Image
                         src={imgSrc}
                         alt={`${productName} image ${index + 1}`}
                         fill
                         sizes="(max-width: 768px) 100vw, 50vw"
                         className="object-contain transition-transform duration-300 hover:scale-105" // Contain ensures full image visible
                         priority={index === 0} // Prioritize first image
                       />
                   </AspectRatio>
                 </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
         <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
         <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Carousel>

      {/* Thumbnail Carousel */}
       {images.length > 1 && (
          <Carousel
             setApi={setThumbApi}
             opts={{
                containScroll: "keepSnaps",
                dragFree: true, // Allows free scrolling
                slidesToScroll: 1, // Scroll one at a time
             }}
             className="w-full"
           >
             <CarouselContent className="-ml-2">
              {images.map((imgSrc, index) => (
                <CarouselItem key={index} className="pl-2 basis-1/4 md:basis-1/5">
                   <button
                      onClick={() => onThumbClick(index)}
                      className={cn(
                         "block w-full overflow-hidden rounded border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                         index === selectedIndex ? 'border-primary' : 'border-transparent hover:border-muted-foreground/50'
                       )}
                       aria-label={`View image ${index + 1}`}
                   >
                     <AspectRatio ratio={1 / 1}>
                        <Image
                         src={imgSrc}
                         alt={`${productName} thumbnail ${index + 1}`}
                         fill
                         sizes="15vw"
                         className="object-cover"
                       />
                    </AspectRatio>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
       )}

        {/* Lightbox */}
        <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={lightboxSlides}
            index={selectedIndex}
            plugins={[Zoom]}
            on={{ view: ({ index }) => setSelectedIndex(index) }} // Sync lightbox index with carousel
         />
    </div>
  );
}

