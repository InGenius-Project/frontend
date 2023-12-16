import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Box, useTheme } from "@mui/material";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import lexicalTheme from "assets/theme/lexicalTheme";
import React from "react";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import ControlPlugin from "./ControlPlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { MarkNode } from "@lexical/mark";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ElementNode, LexicalNode } from "lexical";
import ListMaxIndentLevelPlugin from "./ListMaxIndentLevelPlugin";
import TabFocusPlugin from "./TabFocusPlugin";

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
    // TableNode,
    // TableCellNode,
    // TableRowNode,
  ],
};

type RichTextEditorProps = {
  controllable: boolean;
};

function RichTextEditor({ controllable }: RichTextEditorProps) {
  const theme = useTheme();
  return (
    <Box sx={{ position: "relative" }}>
      <LexicalComposer initialConfig={editorConfig}>
        {controllable ? <ControlPlugin /> : <React.Fragment />}
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              style={{
                padding: "0 8px",
                minHeight: "300px",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "0.3em",
                fontFamily: theme.typography.fontFamily,
              }}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
          placeholder={null}
        />
        <LinkPlugin />
        <HistoryPlugin />
        <TabIndentationPlugin />
        <ListPlugin />
        <AutoFocusPlugin />
        <TabFocusPlugin />
        <ListMaxIndentLevelPlugin maxDepth={3} />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </LexicalComposer>
    </Box>
  );
}

export default RichTextEditor;
