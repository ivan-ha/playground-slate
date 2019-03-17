import React, { Component } from "react";
import "./App.css";
import { Editor, EventHook, BasicEditorProps, Plugin } from "slate-react";
import { Value } from "slate";
import Code from "./Components/Code";
import { markHotKey } from "./Utils/markHotKey";

const plugins = [
  markHotKey({ key: "b", type: "bold" }),
  markHotKey({ key: "i", type: "italic" }),
  markHotKey({ key: "~", type: "strikethrough" }),
  markHotKey({ key: "u", type: "underline" })
];

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
    if (event.ctrlKey) {
      event.preventDefault();
      switch (event.key) {
        case "`":
          const isCode = editor.value.blocks.some(
            block => block!.type == "code"
          );
          editor.setBlocks(isCode ? "paragraph" : "code");
          break;
      }
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

  renderMark: Plugin["renderMark"] = (props, editor, next) => {
    switch (props.mark.type) {
      case "bold":
        return <strong>{props.children}</strong>;
      case "code":
        return <code>{props.children}</code>;
      case "italic":
        return <em>{props.children}</em>;
      case "strikethrough":
        return <del>{props.children}</del>;
      case "underline":
        return <u>{props.children}</u>;
      default:
        return next();
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Editor
            plugins={plugins}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
          />
        </header>
      </div>
    );
  }
}

export default App;
