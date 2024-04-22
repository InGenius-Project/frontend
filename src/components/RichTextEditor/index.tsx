import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { Box, useTheme } from '@mui/material';

import lexicalTheme from '@/assets/theme/lexicalTheme';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { MarkNode } from '@lexical/mark';
import { TRANSFORMERS } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';

import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import React, { useEffect, useState } from 'react';
import ListMaxIndentLevelPlugin from './ListMaxIndentLevelPlugin';
import TabFocusPlugin from './TabFocusPlugin';
import ControlPlugin from './ToolbarPlugin';
import OnChangePlugin from './OnChangePlugin';
import InitialPlugin from './InitialPlugin';

const editorConfig = {
  // The editor theme
  namespace: 'MyEditor',
  theme: lexicalTheme,
  // Handling of errors during update
  onError(error: any) {
    console.error(error);
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
  onChange?: (updateString: string) => void;
  initJsonString?: string;
  initMarkdownString?: string;
};

function RichTextEditor({ controllable = false, onChange, initJsonString, initMarkdownString }: RichTextEditorProps) {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative' }}>
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editable: controllable,
        }}
      >
        {controllable ? (
          <>
            <OnChangePlugin
              initJsonString={initJsonString}
              initMarkdownString={initMarkdownString}
              onChange={onChange}
            />
            <ControlPlugin />
            <LinkPlugin />
            <HistoryPlugin />
            <TabIndentationPlugin />
            <ListPlugin />
            <AutoFocusPlugin />
            <TabFocusPlugin />
            <ListMaxIndentLevelPlugin maxDepth={3} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </>
        ) : (
          <InitialPlugin initJsonString={initJsonString} initMarkdownString={initMarkdownString} />
        )}
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              style={{
                padding: '0 8px',
                minHeight: controllable ? '300px' : 'auto',
                border: controllable ? `1px solid ${theme.palette.divider}` : '',
                borderRadius: '0.3em',
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
