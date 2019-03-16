import React, { Component } from "react";
import "./App.css";
import { Editor, EventHook, BasicEditorProps, Plugin } from "slate-react";
import { Value } from "slate";
import Code from "./Components/Code";

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
    if (event.key === "`" && event.ctrlKey) {
      const isCode = editor.value.blocks.some(block => block!.type == "code");
      event.preventDefault();
      editor.setBlocks(isCode ? "paragraph" : "code");
    }
    return next();
  };

  renderNode: Plugin["renderNode"] = (props, editor, next) => {
    switch (props.node.type) {
      case "code":
        return <Code {...props} />;
      default:
        return next();
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Editor
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
          />
        </header>
      </div>
    );
  }
}

export default App;
