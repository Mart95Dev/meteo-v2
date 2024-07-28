import HeaderImageLocation from "@/app/components/Geolocation/HeaderImageGeolocation";
import imageTest from "../../../public/images/paris.webp"


export default function Header() {
  return (
    <header  >
      <HeaderImageLocation itemImage={imageTest}/>
    </header>
  );
}
