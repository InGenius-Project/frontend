import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';
import { useCallback, useLayoutEffect, useState } from 'react';

type InitialPluginProps = {
  initJsonString?: string;
  onChange?: (updateString: string) => void;
};

export default function MyOnChangePlugin({ initJsonString, onChange }: InitialPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [isFirseRender, setIsFirstRender] = useState(true);

  useLayoutEffect(() => {
    if (isFirseRender) {
      setIsFirstRender(false);
      editor.update(() => {
        try {
          if (initJsonString) {
            const initialEditorState = editor.parseEditorState(initJsonString);

            editor.setEditorState(initialEditorState);
          }
        } catch (e) {
          console.error(e);
        }
      });
    }
  }, [editor, initJsonString, isFirseRender]);

  const handleChange = useCallback(
    (editorState: EditorState) => {
      onChange?.(JSON.stringify(editorState));
    },
    [onChange],
  );

  return <OnChangePlugin onChange={handleChange} />;
}
