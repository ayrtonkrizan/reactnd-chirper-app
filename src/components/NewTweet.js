import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

class NewTweet extends Component{
    state = {
        text: '',
        toHome: false
    }

    handleChange = e =>{
        const text = e.target.value;
        this.setState(() => ({
            text
        }))
    }
    handleSubmit = e =>{
        e.preventDefault();
        const {text} = this.state;
        const { dispatch, id } = this.props;
        //todo: add tweet to store
        dispatch(handleAddTweet(text, id))
        this.setState(() =>({
            text:'',
            toHome: id?false:true
        }))
    }
    
    render(){
        const{text, toHome} = this.state;
        if(toHome)
            return <Redirect to='/' />
        const tweetLeft = 280 - text.length;
        return(
            <div>
                <h3 className='center'>Compose new Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea className='textarea' placeholder="What's happening?" maxLength={280} onChange={this.handleChange}/>
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}
                    <button className='btn' type='submit' disabled={!text.length}>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet);