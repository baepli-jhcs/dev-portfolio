import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MCSS from "./MarkdownPreviewer.module.scss";

export default function Preview(props: { markdown: any }) {
  return (
    <div className={MCSS["preview-container"]}>
      <div className={MCSS.preview}>
        <ReactMarkdown children={props.markdown} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
}
