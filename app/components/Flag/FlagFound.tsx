import Image from 'next/image'
import useFlagStore from '@/app/store/useFlagStore'
import useLanguageBrowserStore from '@/app/store/useLanguageBrowser'
import useCountryStore from '@/app/store/useCountryStore'
import { useEffect, useState } from 'react'


export default function FlagFound() {
  const [isLoading, setIsLoading] = useState(true);
  const {flag_geolocation} = useFlagStore();

  useEffect(() => {
    if(flag_geolocation){
      return setIsLoading(false)
    }
    
  }, [flag_geolocation])
  
       const altFlagImage = useLanguageBrowserStore.getState().language_browser == 'fr' ? `image du drapeau de ${useCountryStore.getState().geo_country}`: `Image of the flag of ${useCountryStore.getState().geo_country}`

  return (
    <div>
      {isLoading ? <Image 
        src="/images/icon_default.png"
        alt="chargement en cours"
        width={64}
        height={35}
        priority
        /> :
     <Image className='flag-border'
     src={useFlagStore.getState().flag_geolocation}
     alt={altFlagImage}
     width={64}
     height={35}
     priority
     />}
    </div>


  )
}
