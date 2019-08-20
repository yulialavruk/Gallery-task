import React from "react";
import _ from "lodash";

export default class ImageItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(nextProps.image, this.props.image)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { item } = this.props;
    console.log("rand");
    return (
      <div className="card" style={{ border: 0 }}>
        <img
          className="card-img-top card-img--height"
          src={item.thumbnail}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">
            Number of comments: {item.num_comments}
          </div>
          <a href={`https://www.reddit.com${item.permalink}`}>Link</a>
        </div>
      </div>
    );
  }
}
