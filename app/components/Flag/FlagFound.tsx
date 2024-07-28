import Image from 'next/image'
import useFlagStore from '@/app/store/useFlagStore'
import useLanguageBrowserStore from '@/app/store/useLanguageBrowser'
import useCountryStore from '@/app/store/useCountryStore'


export default function FlagFound() {

    const altFlagImage = useLanguageBrowserStore.getState().language_browser == 'fr' ? `image du drapeau de ${useCountryStore.getState().geo_country}`: `Image of the flag of ${useCountryStore.getState().geo_country}`

  return (
   <Image className='flag-border'
   src={useFlagStore.getState().flag_geolocation}
   alt={altFlagImage}
   width={64}
   height={35}
   />
  )
}
