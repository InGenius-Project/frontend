import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLayoutEffect } from 'react';

type InitialPluginProps = {
  initJsonString?: string;
};

export default function InitialPlugin({ initJsonString }: InitialPluginProps) {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    console.log(initJsonString);
    try {
      if (initJsonString) {
        const initialEditorState = editor.parseEditorState(initJsonString);

        editor.setEditorState(initialEditorState);
      }
    } catch (e) {
      console.error(e);
    }
  }, [editor, initJsonString]);

  return null;
}
