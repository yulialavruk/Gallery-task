import React from "react";
import { Spinner } from "reactstrap";
import Field from "./Field";

export default class Header extends React.Component {
  render() {
    const { autoRefresh, refresh, current_comments, onChange } = this.props;
    return (
      <div className="text-center">
        <h1>Top commented</h1>
        <button type="button" onClick={autoRefresh}>
          {refresh ? "Stop auto-refresh" : "Start auto-refresh"}
        </button>
        {refresh && <Spinner color="primary" />}
        <Field
          type="range"
          labelText={`Current filter:${current_comments}`}
          id="range"
          max="1500"
          min="0"
          step="10"
          name="current_comments"
          value={current_comments}
          onChange={onChange}
        />
      </div>
    );
  }
}
