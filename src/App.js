import React from "react";
import { Spinner } from "reactstrap";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      images: [],
      spinner: true
    };
  }

  componentDidMount() {
    fetch("https://www.reddit.com/r/aww.json")
      .then(response => response.json())
      .then(data =>
        this.setState({
          images: data.data.children,
          spinner: false
        })
      );
  }
  render() {
    console.log(this.state.images);
    const { images } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <h1>Top commented</h1>
            {this.state.spinner ? (
              <div>
                <Spinner color="primary" />
              </div>
            ) : (
              <div className="row">
                {images
                  .sort((a, b) => b.data.num_comments - a.data.num_comments)
                  .map((item, index) => {
                    if (item.data.post_hint === "image") {
                      return (
                        <div className="col-4" key={index}>
                          <div className="card">
                            <img
                              className="card-img-top card-img--height"
                              src={item.data.url}
                              alt=""
                            />
                            <div className="card-body">
                              <h6 className="card-title">{item.data.title}</h6>
                              <div className="card-text">
                                Number of comments: {item.data.num_comments}
                              </div>
                              <a
                                href={`https://www.reddit.com${item.data.permalink}`}
                              >
                                Link
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return false;
                    }
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
