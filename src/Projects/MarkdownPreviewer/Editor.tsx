import MCSS from "./MarkdownPreviewer.module.scss";

export default function Editor(props: {
  markdown: string | number | readonly string[] | undefined;
  setMarkdown: (arg0: string) => void;
}) {
  return (
    <div className={MCSS["editor-container"]}>
      <textarea
        className={MCSS.editor}
        value={props.markdown}
        onChange={(event) => props.setMarkdown(event.target.value)}
        placeholder="Editor"
      />
    </div>
  );
}
