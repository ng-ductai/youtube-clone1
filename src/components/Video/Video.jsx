import React, { useEffect, useState } from 'react'
import './_video.scss'
import request from '../../api'
import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'

const Video = ({video, channel }) => {
    const { 
        id, 
        snippet:{
            channelId, 
            channelTitle, 
            title, 
            publishedAt, 
            thumbnails: {medium} 
        },
        contentDetails
    } = video
    
    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChannelIcon] = useState(null)

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds*1000).format('mm:ss')

    const _videoId = id?._videoId || contentDetails?.video || id
    const history = useNavigate()

    useEffect(() => {
        const get_video_details = async () => {
            const {
                data: { items },
            } = await request('/videos', {
                params: {
                    part: 'contentDetails, statistics',
                    id: _videoId,
                },
            })
            setDuration(items[0].contentDetails.duration)
            setViews(items[0].statistics.viewCount) 
        }
        get_video_details()
    }, [_videoId])

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

    const handleVideoClick = () => {
        history(`/watch/${_videoId}`)
    }

    return (
        <div className="video" onClick={handleVideoClick}>
            <div className="video__top">
                <LazyLoadImage src={medium.url} effect='blur' />
                <span className='video__top__duration'>{_duration}</span>
            </div>

            <div className="video__info">
                {!channel && (
                    <div className="channel">
                        <LazyLoadImage src={channelIcon?.url} effect='blur' />
                    </div>
                )}

                <div className='details'>
                    <div className="details__title"> {title} </div>

                    {!channel && (
                        <div className="details__channel">
                            <p>{channelTitle}</p>
                        </div>
                    )}

                    <div className="details__view">
                        <span>
                            <span className='details__view--upper'>
                                {numeral(views).format("0.a")}
                            </span> Views • {' '}
                        </span> 
                        <span>{moment(publishedAt).fromNow()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video
