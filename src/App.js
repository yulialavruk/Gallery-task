import React from "react";
import { Spinner } from "reactstrap";
import ImageItem from "./ImageItem";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      images: [],
      spinner: true,
      refresh: false
    };
    this.interval = 0;
  }

  loadData = () => {
    fetch("https://www.reddit.com/r/aww.json")
      .then(response => response.json())
      .then(data =>
        this.setState({
          images: data.data.children,
          spinner: false
        })
      );
  };

  componentDidMount() {
    this.loadData();
  }
  autoRefresh = () => {
    this.setState(
      {
        refresh: !this.state.refresh
      },
      () => {
        if (this.state.refresh) {
          this.interval = setInterval(this.loadData, 3000);
        } else {
          clearInterval(this.interval);
        }
      }
    );
  };

  render() {
    const { images, refresh, spinner } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="text-center">
              <h1>Top commented</h1>
              <button type="button" onClick={this.autoRefresh}>
                {refresh ? "Stop auto-refresh" : "Start auto-refresh"}
              </button>
              {refresh && <Spinner color="primary" />}
            </div>
            {spinner ? (
              <div className="text-center mt-5">
                <Spinner width="300px" height="300px" color="primary" />
              </div>
            ) : (
              <div className="row">
                {images
                  .sort((a, b) => b.data.num_comments - a.data.num_comments)
                  .map((item, index) => {
                    if (item.data.post_hint === "image") {
                      return (
                        <div className="col-4 mt-4" key={index}>
                          <ImageItem image={item} />
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
