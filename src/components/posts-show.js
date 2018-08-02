import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  render() {
    const { post } = this.props;

    const buttons = (
      <div>
        <Link to="/">Return to post index</Link>
        <div>
          <button
            className="btn btn-danger pull-xs-right"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Post
          </button>
        </div>
      </div>
    );

    if (!post) {
      return <div>Loading post...</div>;
    }

    return (
      <div>
        {buttons}
        <h3>{post.title}</h3>
        <h4>{post.categories}</h4>
        <h6>{post.content}</h6>
      </div>
    );
  }

  onDeleteClick(event) {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { fetchPost, deletePost }
)(PostsShow);
