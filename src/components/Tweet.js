import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { formatTweet, formatDate } from '../utils/helpers';
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweet } from '../actions/tweets';


class Tweet extends Component {
    handleLike = e =>{
        e.preventDefault()
        
        const { dispatch, tweet, authedUser } = this.props;

        dispatch(handleToggleTweet({
            id: tweet.id,
            authedUser,
            hasLiked: tweet.hasLiked
        }))
    }

    toParent = (e, id) =>{
        e.preventDefault()
        this.props.history.push(`/tweet/${id}`)
    }

    render(){
        const {tweet} = this.props;
        if(!tweet)
            return (<p>this tweet doesn't exists</p>)
        
        const { name, avatar, timestamp, text, hasLiked, likes, replies, parent, id } = tweet;

        return(
            <Link to={`/tweet/${id}`} className='tweet'>
                <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={e => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon'/>
                        <span>{replies !==0  && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {hasLiked ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />: <TiHeartOutline className='tweet-icon'/>}
                        </button>
                        <span>{likes !==0  && likes}</span>                        
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({authedUser, users, tweets}, { id }){
    const tweet = tweets[id];
    const parentTweet = tweet? tweets[tweet.replyingTo] : null;
    return {
        authedUser,
        tweet: !tweet? null : formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
    }
}

export default withRouter(connect(mapStateToProps)(Tweet));