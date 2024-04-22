import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';
import { useCallback, useLayoutEffect, useState } from 'react';

type InitialPluginProps = {
  initJsonString?: string;
  initMarkdownString?: string;
  onChange?: (updateString: string) => void;
};

export default function MyOnChangePlugin({ initJsonString, initMarkdownString, onChange }: InitialPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [isFirseRender, setIsFirstRender] = useState(true);

  useLayoutEffect(() => {
    if (isFirseRender) {
      setIsFirstRender(false);
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
    }
  }, [editor, initJsonString, initMarkdownString, isFirseRender]);

  const handleChange = useCallback(
    (editorState: EditorState) => {
      onChange?.(JSON.stringify(editorState));
    },
    [onChange],
  );

  return <OnChangePlugin onChange={handleChange} />;
}
