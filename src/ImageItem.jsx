import React from "react";

export default class ImageItem extends React.Component {
  render() {
    const { image } = this.props;
    return (
      <div className="card" style={{ border: 0 }}>
        <img
          className="card-img-top card-img--height"
          src={image.data.url}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{image.data.title}</h6>
          <div className="card-text">
            Number of comments: {image.data.num_comments}
          </div>
          <a href={`https://www.reddit.com${image.data.permalink}`}>Link</a>
        </div>
      </div>
    );
  }
}
