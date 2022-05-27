import { useState } from "react";
import Editor from "./Editor";
import Preview from "./Preview";
import MCSS from "./MarkdownPreviewer.module.scss";

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(placeholder);
  return (
    <div className={MCSS.container}>
      <Editor markdown={markdown} setMarkdown={setMarkdown} />
      <Preview markdown={markdown} />
    </div>
  );
}

const placeholder = `# Welcome to my React Markdown Previewer!
## This is a sub-heading
Code: \`<div></div>\`.
\`\`\`
let example = (exampleText) => {
  console.log(exampleText);
}
\`\`\`
"**Lorem** ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim _id est laborum_."
"~~Lorem~~ ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim ~~id est laborum~~."
[links](https://www.freecodecamp.org)
> Block Quotes!

Column 1 | Column 2
------------ | -------------
Row 1 | continued.
Row 2 | continued.
- Bulleted List
  - Second indentation level
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
