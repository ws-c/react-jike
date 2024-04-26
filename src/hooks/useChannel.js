import { useEffect, useState } from "react";
import { fetchChannelsAPI } from "@/api/article";
function useChannel() {
  const [channelList, setChannelList] = useState([])
  useEffect( () => {
    async function getchannelList(){
      const res = await fetchChannelsAPI()
      setChannelList(res.data.channels)
    }
    getchannelList()
  },[])
  return {channelList};
}
export {useChannel};