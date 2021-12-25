import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './_channel.scss'
import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelDetails } from '../../redux/actions/channelAction'
import { getVideosByChannel } from '../../redux/actions/videosAction'
import { useParams } from 'react-router-dom'
import Video from '../../components/Video/Video'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const Channel = () => {
    const { channelId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideosByChannel(channelId))
        dispatch(getChannelDetails(channelId))
    }, [dispatch, channelId])

    const { videos, loading } = useSelector(state => state.channelVideos)
    const { snippet, statistics } = useSelector(
        state => state.channelDetails.channel
    )

    return (
      <>
        <div className='px-3 py-2 my-2 d-flex justify-content-between align-items-center channelHeader'>
            <div className='d-flex align-items-center channelHeader__left'>
                <img src={snippet?.thumbnails?.default?.url} alt='' />

                <div className='ml-3 channelHeader__details'>
                    <h3>{snippet?.title}</h3>
                    <span>
                        {numeral(statistics?.subscriberCount).format('0.a')}{' '}
                     subscribers
                    </span>
                </div>
            </div>

            <button>Subscribe</button>
        </div>

        <div className='channel__option'>
            <li className='channel__option-active'> 
                Home
            </li>
            <li>
                VIDEO
            </li>
            <li>
                PLAYLIST
            </li>
            <li>
                Community
            </li>
            <li>
                Channel
            </li>
            <li>
                Introduce
            </li>
            <li>
                Search
            </li>
        </div>

        <Container>
            <Row className='mt-2'>
               {!loading
                  ? videos?.map(video => (
                       <Col md={3} lg={3}>
                          <Video video={video} channel />
                       </Col>
                    ))
                  : [...Array(15)].map(() => (
                        <Col md={3} lg={3}>
                            <SkeletonTheme
                                color='#343a40'
                                highlightColor='#3c4147'
                            >
                                <Skeleton width='100%' height='140px' />
                            </SkeletonTheme>
                        </Col>
                ))}
            </Row>
        </Container>
      </>
    )
}

export default Channel
