import NoFlagFound from "./NoFlagFound"
import FlagFound from "./FlagFound"
import useFlagStore from "@/app/store/useFlagStore"

export default function FlagDisplay() {
  return (
   <>
   {useFlagStore.getState().no_flag_geolocation ? <NoFlagFound/> : <FlagFound/>}
   </>
  )
}
