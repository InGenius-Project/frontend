import {
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Box, useTheme } from "@mui/material";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import lexicalTheme from "@/assets/theme/lexicalTheme";
import React from "react";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import ControlPlugin from "./ToolbarPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { MarkNode } from "@lexical/mark";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import ListMaxIndentLevelPlugin from "./ListMaxIndentLevelPlugin";
import TabFocusPlugin from "./TabFocusPlugin";
import { EditorState, LexicalEditor } from "lexical";
import InitialPlugin from "./InitialPlugin";

const editorConfig = {
  // The editor theme
  namespace: "MyEditor",
  theme: lexicalTheme,
  // Handling of errors during update
  onError(error: any) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    MarkNode,
    LinkNode,
    AutoLinkNode,
  ],
};

type RichTextEditorProps = {
  controllable?: boolean;
  onChange?: (
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>
  ) => void;
  initialEditorState?: InitialEditorStateType;
};

function RichTextEditor({
  controllable = true,
  onChange,
  initialEditorState,
}: RichTextEditorProps) {
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative" }}>
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editable: controllable,
        }}
      >
        <InitialPlugin initialEditorState={initialEditorState} />

        {controllable ? (
          <>
            <ControlPlugin />
            <LinkPlugin />
            <HistoryPlugin />
            <TabIndentationPlugin />
            <ListPlugin />
            <AutoFocusPlugin />
            <TabFocusPlugin />
            <ListMaxIndentLevelPlugin maxDepth={3} />
            {onChange ? (
              <OnChangePlugin
                onChange={onChange}
                ignoreSelectionChange
              ></OnChangePlugin>
            ) : (
              <React.Fragment />
            )}
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </>
        ) : (
          <React.Fragment />
        )}
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              style={{
                padding: "0 8px",
                minHeight: controllable ? "300px" : "auto",
                border: controllable
                  ? `1px solid ${theme.palette.divider}`
                  : "",
                borderRadius: "0.3em",
                fontFamily: theme.typography.fontFamily,
              }}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
          placeholder={null}
        />
      </LexicalComposer>
    </Box>
  );
}

export default RichTextEditor;
