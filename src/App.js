import React from "react";
import { Spinner } from "reactstrap";
import Header from "./Header";
import ImageItem from "./ImageItem";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      images: [],
      spinner: true,
      refresh: false,
      current_comments: 0
    };
    this.interval = 0;
  }
  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
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
    const { images, refresh, spinner, current_comments } = this.state;
    const filteredData = images
      .filter(
        item =>
          item.data.post_hint === "image" &&
          item.data.num_comments > current_comments
      )
      .sort((a, b) => b.data.num_comments - a.data.num_comments);
    const someComments = filteredData.some(
      item => item.data.num_comments >= current_comments
    );
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <Header
              autoRefresh={this.autoRefresh}
              refresh={refresh}
              current_comments={current_comments}
              onChange={this.onChange}
            />
            {spinner ? (
              <div className="text-center mt-5">
                <Spinner color="primary" />
              </div>
            ) : (
              <div className="row">
                {someComments ? (
                  filteredData.map((item, index) => {
                    return (
                      <div className="col-4 mt-4" key={index}>
                        <ImageItem image={item} />
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
