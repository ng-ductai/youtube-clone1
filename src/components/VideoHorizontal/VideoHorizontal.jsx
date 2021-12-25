import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import './_videoHorizontal.scss'
import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'
import request from '../../api'

const VideoHorizontal = ({video, search, subscription}) => {
    const {
        id,
        snippet: {
           channelId,
           channelTitle,
           description,
           title,
           publishedAt,
           thumbnails: { medium },
           resourceId,
        },
     } = video

    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChannelIcon] = useState(null)

    const isVideo = !(id.kind === 'youtube#channel' || subscription)

    useEffect(() => {
        const get_video_details = async () => {
            const {
                data: { items },
            } = await request('/videos', {
                params: {
                    part: 'contentDetails, statistics',
                    id: id.videoId,
                },
            })
            setDuration(items[0].contentDetails.duration)
            setViews(items[0].statistics.viewCount)
        }
        if (isVideo) 
            get_video_details()
     }, [id, isVideo])
  
    useEffect(() => {
        const get_channel_icon = async () => {
            const {
                data: { items },
            } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId,
                },
            })
            setChannelIcon(items[0].snippet.thumbnails.default)
        }
        get_channel_icon()
    }, [channelId])

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    const history = useNavigate()
    const _channelId = resourceId?.channelId || channelId

    const handleClick = () => {
        isVideo
            ? history(`/watch/${id.videoId}`)
            : history(`/channel/${_channelId}`)
    }

    const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel'

    return (
        <Row 
            className='videoHorizontal m-1 py-2 align-items-center'
            onClick={handleClick}    
        >
            <Col xs={6} md={search || subscription ? 4 : 6} className='videoHorizontal__left'>
                <LazyLoadImage
                    src={medium.url}
                    effect='blur'
                    className={`videoHorizontal__thumbnail ${thumbnail} `}
                    wrapperClassName='videoHorizontal__thumbnail-wrapper'
                />

                {isVideo && (
                    <span className='videoHorizontal__duration'>{_duration}</span>
                )}

            </Col>

            <Col xs={6} md={search || subscription ? 7 : 6} className='videoHorizontal__right  p-0'>
                    <p className='mb-1 videoHorizontal__title'>{title}</p>
                
                    <div className='my-1 videoHorizontal__channel d-flex align-items-center'>
                        {isVideo && (      
                            <LazyLoadImage 
                                src={channelIcon?.url} 
                                effect='blur' 
                                className='videoHorizontal__channel-img'
                            />
                        )} 
                        <p className='mb-0'>{channelTitle}</p>
                    </div>

                    {isVideo && (
                        <div className='videoHorizontal__details'>
                            <span className='videoHorizontal__details__upper'>{numeral(views).format('0.a')}</span> Views • {' '}
                            {moment(publishedAt).fromNow()}
                        </div>
                    )}   

                    {(search || subscription ) && (
                        <p className='mt-1 videoHorizontal__desc'>{description}</p>
                    )}

                    {subscription && (
                        <p className='mt-2'>
                            {video.contentDetails.totalItemCount}  Videos
                        </p>
                    )}
            
            </Col>
        </Row>
    )
}

export default VideoHorizontal
