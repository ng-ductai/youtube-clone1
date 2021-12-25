import React, { useEffect } from 'react'
import './_home.scss'
import { Col, Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../../components/Categories/Categories'
import Video from '../../components/Video/Video'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videosAction'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeletons from '../../components/Skeletons/Skeletons'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPopularVideos() )
    }, [dispatch])

    const {videos, activeCategory, loading} = useSelector(
        state => state.homeVideos
    )

    const fetchData = () => {
        if (activeCategory === 'All') 
            dispatch(getPopularVideos())
        else {
           dispatch(getVideosByCategory(activeCategory))
        }
    }
    
    return (
        <Container className='home'>
            <Categories />

            <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'></div>
                }
                className='row'>
                {
                    !loading
                        ? videos.map(video => (
                            <Col lg={3} md={4}>
                                <Video video={video} key={video.id} />
                            </Col>
                        ))
                        : [...Array(20)].map(() => (
                            <Col lg={3} md={4}>
                                <Skeletons />
                            </Col>
                        ))
                }
            </InfiniteScroll>
            
        </Container>
    )
}

export default Home
