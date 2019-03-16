import React, { Component } from "react";
import "./App.css";
import { Editor } from "slate-react";
import { Value } from "slate";

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "A line of text in a paragraph."
              }
            ]
          }
        ]
      }
    ]
  }
});

class App extends Component {
  state = {
    value: initialValue
  };

  onChange = ({ value }: any) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Editor value={this.state.value} onChange={this.onChange} />
        </header>
      </div>
    );
  }
}

export default App;
