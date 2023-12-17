import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";

const HISTORY_MERGE_OPTIONS = { tag: "history-merge" };

type InitialPluginProps = {
  initialEditorState?: InitialEditorStateType;
};

export default function InitialPlugin({
  initialEditorState,
}: InitialPluginProps) {
  const [editor] = useLexicalComposerContext();

  React.useLayoutEffect(() => {
    if (initialEditorState !== null) {
      switch (typeof initialEditorState) {
        case "string": {
          const parsedEditorState = editor.parseEditorState(initialEditorState);
          editor.setEditorState(parsedEditorState, HISTORY_MERGE_OPTIONS);
          break;
        }
        case "object": {
          editor.setEditorState(initialEditorState, HISTORY_MERGE_OPTIONS);
          break;
        }
      }
    }
  }, [initialEditorState, editor]);
  return null;
}
