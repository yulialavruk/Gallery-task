import React from "react";
import { Spinner } from "reactstrap";
import Header from "./Header";
import ImageItem from "./ImageItem";

const RELOAD_TIME = 3000;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      images: [],
      isLoading: true,
      isRefresh: false,
      current_comments: 0
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  loadData = () => {
    fetch("https://www.reddit.com/r/aww.json")
      .then(response => response.json())
      .then(data =>
        this.setState({
          images: data.data.children,
          isLoading: false
        })
      );
  };

  autoRefresh = () => {
    this.setState(
      {
        isRefresh: !this.state.isRefresh
      },
      () => {
        if (this.state.isRefresh) {
          this.interval = setInterval(this.loadData, RELOAD_TIME);
        } else {
          clearInterval(this.interval);
        }
      }
    );
  };

  getFilteredData = () => {
    const filteredData = this.state.images
      .filter(item => item.data.num_comments > this.state.current_comments)
      .sort((a, b) => b.data.num_comments - a.data.num_comments);
    return filteredData;
  };

  render() {
    const { isRefresh, isLoading, current_comments } = this.state;
    const filteredData = this.getFilteredData();
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <Header
              autoRefresh={this.autoRefresh}
              refresh={isRefresh}
              current_comments={current_comments}
              onChange={this.onChange}
            />
            {isLoading ? (
              <div className="text-center mt-5">
                <Spinner color="primary" />
              </div>
            ) : (
              <div className="row">
                {filteredData.length > 0 ? (
                  filteredData.map((post, index) => {
                    return (
                      <div className="col-4 mt-4" key={index}>
                        <ImageItem item={post.data} />
                      </div>
                    );
                  })
                ) : (
                  <div className="col-12">
                    <div className="text-center" style={{ color: "red" }}>
                      <h3>No results found matching your criteria</h3>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
