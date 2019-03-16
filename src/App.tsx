import React, { Component } from "react";
import "./App.css";
import { Editor, EventHook, BasicEditorProps } from "slate-react";
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

  onChange: BasicEditorProps["onChange"] = ({ value }) => {
    this.setState({ value });
  };

  // FIXME: `key` isn't exist on `event`
  onKeyDown: EventHook = (event: any, editor, next) => {
    if (event.key === "&") {
      event.preventDefault();
      editor.insertText("and");
    }
    return next();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Editor
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
        </header>
      </div>
    );
  }
}

export default App;
