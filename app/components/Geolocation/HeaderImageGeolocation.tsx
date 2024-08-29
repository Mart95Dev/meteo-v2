import useGeolocationStore from "@/app/store/useGeolocationStore";
import Image from "next/image";
import type { StaticImageData } from "next/image";

type itemImageProps = {
  itemImage: string | StaticImageData;
};

export default function HeaderImageGeolocation({ itemImage }: itemImageProps) {
  const { isGeolocationEnabled } = useGeolocationStore();

  return (
    <>
      {isGeolocationEnabled && (
        <div className="image-location-container">
          <Image
            src={itemImage}
            alt="Picture of the author"
            fill
            sizes="(max-width: 440px) 100vw, 440px"
            priority
          />
        </div>
      )}
    </>
  );
}
