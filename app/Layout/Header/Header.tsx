import BoxImageGeolocation from "@/app/components/BoxImageGeolocation/BoxImageGeolocation";
import imageTest from "../../../public/images/paris.webp"


export default function Header() {
  return (
    <header  >
      <BoxImageGeolocation itemImage={imageTest}/>
    </header>
  );
}
