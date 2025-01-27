"use client"

import Image from "next/image"
import { useInView } from "framer-motion"
import { useRef, memo, useMemo } from "react"

// Define the type first
type ImageType = {
  id: number
  src: string
  alt: string
  width: number
  height: number
}

const images = [
  {
    id: 1,
    src: "/images/placeholder.svg",
    alt: "Landscape photograph 1",
    width: 1080,
    height: 720,
  },
  {
    id: 2,
    src: "/images/placeholder.svg",
    alt: "Landscape photograph 2",
    width: 1080,
    height: 720,
  }
] as const

const useImageColumns = (images: readonly ImageType[]) => {
  return useMemo(() => ({
    leftColumnImages: images.filter((_, i) => i % 2 === 0),
    rightColumnImages: images.filter((_, i) => i % 2 === 1)
  }), [images])
}

const ImageItem = memo(({ image, index }: { 
  image: ImageType
  index: number 
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "200px 0px",
    amount: 0.1
  })

  const imageProps = useMemo(() => ({
    loading: (index < 4 ? "eager" : "lazy") as "eager" | "lazy",
    priority: index < 4
  }), [index])

  return (
    <div ref={ref} className="min-h-[200px] transform-gpu">
      {isInView && (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          {...imageProps}
          className="transition-opacity duration-1000 ease-in-out opacity-0 data-[loaded=true]:opacity-100"
          onLoadingComplete={(img) => {
            img.dataset.loaded = "true"
          }}
        />
      )}
    </div>
  )
})

ImageItem.displayName = 'ImageItem'

export default function PhotosPage() {
  const { leftColumnImages, rightColumnImages } = useImageColumns(images)

  return (
    <div className="mx-auto mt-4 w-full max-w-6xl">
      <h1 className="text-center font-bold mb-6">Photo Library</h1>
      <div className="flex gap-2.5 max-w-[1400px] mx-auto">
        {[leftColumnImages, rightColumnImages].map((columnImages, columnIndex) => (
          <div key={columnIndex} className="flex flex-col flex-1 gap-2.5">
            {columnImages.map((image, i) => (
              <ImageItem key={image.id} image={image} index={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

