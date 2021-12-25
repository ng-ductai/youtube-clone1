import axios from 'axios'
const request = axios.create({
   baseURL: 'https://youtube.googleapis.com/youtube/v3/',
   params: {
      key: 'AIzaSyCGiUIHVh1rpWUH04V8XG133huIIUyR5gc',
   },
})

export default request