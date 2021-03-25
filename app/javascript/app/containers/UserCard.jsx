import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import FollowButton from './FollowButton';


class UserCard extends Component {

    render() {
        let buttonColor
        let buttonText
        if (this.props.users.length > 0 && Object.keys(this.props.user).length > 0) {
            console.log(this.props.user)
            console.log(this.props.users)
            let user = this.props.users.filter(user => user.id == this.props.user.id)[0]
            if (user.received_follows.some(follow => follow.follower.id == this.props.user_logged.id && follow.is_followed)) {
                buttonColor = 'btn btn-light follow-button'
                buttonText = 'Unfollow'
            
            } else {
                buttonColor = 'btn btn-primary follow-button'
                buttonText = 'Follow'
            }
        }
        return (
            <div className="non-followed-user">
                <p>{this.props.user.username}</p>
                <div className='flex'>
                    <Image className="avatar" cloudName="dg4hemebf" publicId={this.props.user.photo_key} width="50" crop="scale" />
                    <FollowButton user_id={this.props.user.id} className={buttonColor} text={buttonText}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
     follows: state.follows,
     user_logged: state.user_logged,
     users: state.users
    };
  }  

export default connect(mapStateToProps)(UserCard)