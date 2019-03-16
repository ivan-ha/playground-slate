import React from "react";

const Code = (props: any) => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
);

export default Code;
