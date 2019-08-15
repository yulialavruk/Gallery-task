import React from "react";
import imagesData from "./data/images";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      images: imagesData
    };
  }
  render() {
    const { images } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <h1>Top commented</h1>
            <div className="row">
              {images.map(item => {
                return (
                  <div className="col-4">
                    <div className="card">
                      <img
                        className="card-img-top card-img--height"
                        src={item.url}
                        alt=""
                      />
                      <div className="card-body">
                        <h6 className="card-title">{item.title}</h6>
                        <div className="card-text">
                          Number of comments: {item.comments}
                        </div>
                        <a href={item.link}>Link</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
