import React, { Component } from "react";

class SubmitButton extends Component {
  render() {
    return (
      <div>
        <button className="submit" onClick={() => this.props.method()}>
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default SubmitButton;
