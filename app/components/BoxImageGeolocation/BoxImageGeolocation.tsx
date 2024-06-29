import Image from "next/image";
import type { StaticImageData } from 'next/image'; 


type itemImageProps ={
  itemImage: StaticImageData;
}

export default function BoxImageGeolocation({itemImage}: itemImageProps) {
  return (
    <Image
    src={itemImage}
    alt="Picture of the author"
    width={360} 
    height={175} 
    // blurDataURL="data:..." automatically provided
    // placeholder="blur" // Optional blur-up while loading
  />  )
}
