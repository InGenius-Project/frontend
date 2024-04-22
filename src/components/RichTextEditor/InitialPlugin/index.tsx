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
      try {
        // Check json pars
        JSON.parse(initJsonString || '');

        if (initJsonString) {
          const initialEditorState = editor.parseEditorState(initJsonString);

          editor.setEditorState(initialEditorState);
        }
      } catch (e) {}

      try {
        $convertFromMarkdownString(initMarkdownString || '', TRANSFORMERS);
      } catch (e) {}
    });
  }, [editor, initJsonString, initMarkdownString]);

  return null;
}
