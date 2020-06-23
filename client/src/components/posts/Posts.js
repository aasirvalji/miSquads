import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import PostForm from "./PostForm";
import Spinner from '../layout/Spinner';
import { getPosts, addLike, removeLike, deletePost } from '../../actions/post';
import '../../styles/Posts.css';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

//Material UI import
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//Moment import
import Moment from 'react-moment';

const Posts = ({
  getPosts,
  post: { posts, loading },
  scheduleId,
  addLike,
  removeLike,
  deletePost,
  showActions,
  auth,
}) => {
  useEffect(() => {
    getPosts(scheduleId);
  }, [getPosts]);

  /* start toggle comments display */
  // const [showCommentForm, setShowCommentForm] = useState(false);

  // const toggleCommentFormDisplay = () => {
  //   setShowCommentForm(!showCommentForm);
  // };
  /* end toggle comments display */

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {console.log(posts)}
      {/* <PostForm /> */}
      <div id="posts">
        {posts.map((post) => (
          <Paper elevation={2}>
            <div class="post" key={post._id}>
              <div class="post-header">
                {/* <img class="round-img" src={avatar} alt="" /> */}
                <h4 className="post-name">{post.name} says...</h4>
                <p class="post-date">
                  Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
                </p>
              </div>
              <div class="post-body">
                <p class="my-1">{post.text}</p>
              </div>
              <div className="post-footer">
                <button
                  onClick={() => addLike(post._id)}
                  type="button"
                  className="like-button"
                >
                  <i
                    class="fas fa-heart"
                    id={post.likes.map(
                      (like) =>
                        like.user.toString() === auth.user._id.toString() &&
                        'number-of-likes'
                    )}
                  ></i>{' '}
                  <span className="number-of-likes-text">
                    {post.likes.length}
                  </span>
                </button>
                <div>
                  <i class="far fa-comments" id="number-of-comments"></i>
                  <span className="number-of-comments-text">
                    &nbsp;({post.comments.length})
                  </span>
                </div>
              </div>
              <CommentForm postId={post._id} user={auth.user}></CommentForm>
              <>
                {post.comments.map((comment) => (
                  <CommentItem comment={comment} postId={post._id} />
                ))}
              </>
            </div>
          </Paper>
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  showActions: true,

  auth: PropTypes.object.isRequired,
  removeLike: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPosts,
  addLike,
  removeLike,
  deletePost,
})(Posts);
