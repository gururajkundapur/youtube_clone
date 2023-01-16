import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setchannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  const { id } = useParams();

  console.log(channelDetail, videos)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setchannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(189,31,208,1) 0%, rgba(63,156,182,1) 19%, rgba(17,196,232,1) 82%, rgba(236,16,238,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}
        />
        <ChannelCard channelDetail={channelDetail} 
        marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: {sm: '100px'}}} />
            <Videos videos={videos}  />
      </Box>
    </Box>
  )
}

export default ChannelDetail