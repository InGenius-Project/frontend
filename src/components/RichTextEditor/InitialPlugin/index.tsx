import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLayoutEffect } from 'react';

type InitialPluginProps = {
  initJsonString?: string;
  initMarkdownString?: string;
};

export default function InitialPlugin({ initJsonString, initMarkdownString }: InitialPluginProps) {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    editor.update(() => {
      if (initJsonString) {
        try {
          // Check json pars
          JSON.parse(initJsonString || '');

          if (initJsonString) {
            const initialEditorState = editor.parseEditorState(initJsonString);

            editor.setEditorState(initialEditorState);
          }
        } catch (e) {
          console.error(e);
        }
      } else if (initMarkdownString) {
        try {
          $convertFromMarkdownString(initMarkdownString || '', TRANSFORMERS);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }, [editor, initJsonString, initMarkdownString]);

  return null;
}
