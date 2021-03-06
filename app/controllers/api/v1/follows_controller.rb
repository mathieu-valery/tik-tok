class Api::V1::FollowsController < ActionController::Base
    skip_before_action :verify_authenticity_token
    def index
        follows = Follow.all

        render json: follows
    end

    def follow_user
        followed_user = User.find(params[:id])
        new_follow = Follow.new(follower: current_user, followed_user: followed_user)
        follow = Follow.find_by(follower: current_user, followed_user: followed_user)

        if new_follow.save
            # response to post request when an new follow is created
            users = User.all

                render json: { 
                    follow: FollowSerializer.new(new_follow).as_json,
                    user_logged: UserSerializer.new(current_user).as_json,
                    users: ActiveModel::SerializableResource.new(users, each_serializer: UserSerializer).as_json,
                }
            else
                follow.is_followed ? follow.update(is_followed: false) : follow.update(is_followed: true)
                
                 # response to post request when user follow/unfollow another user. 
                 users = User.all
                 
                 render json: { 
                    follow: FollowSerializer.new(follow).as_json,
                    user_logged: UserSerializer.new(current_user).as_json,
                    users: ActiveModel::SerializableResource.new(users, each_serializer: UserSerializer).as_json,
                }
            end
    
    end

end
 