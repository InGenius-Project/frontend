import * as React from "react";
import { styled } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  TextFormatType,
  ElementNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import { $createCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const LowPriority = 1;

const ControlButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const supportedBlockTypes = [
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
];

const blockTypeToBlockName = {
  code: "程式碼",
  h1: "標題1",
  h2: "標題2",
  ol: "編號清單",
  paragraph: "一般文字",
  quote: "引用",
  ul: "項目清單",
};

export default function ControlePlugin() {
  const [editor] = useLexicalComposerContext();

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const [blockType, setBlockType] = useState("paragraph");
  const [textFormats, setTextFormats] = useState<TextFormatType[]>([]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Set Block Format
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }

      //  Set text Format
      const currentFormats: TextFormatType[] = [];
      selection.hasFormat("bold") && currentFormats.push("bold");
      selection.hasFormat("italic") && currentFormats.push("italic");
      selection.hasFormat("underline") && currentFormats.push("underline");
      selection.hasFormat("code") && currentFormats.push("code");
      selection.hasFormat("strikethrough") &&
        currentFormats.push("strikethrough");
      setTextFormats(currentFormats);
    }
  }, [editor]);

  const handleTextFormatClick = (
    event: React.MouseEvent,
    value: TextFormatType
  ) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, value);
  };

  const blockHandlers = {
    paragraph: () => $createParagraphNode(),
    h1: () => $createHeadingNode("h1"),
    h2: () => $createHeadingNode("h2"),
    quote: () => $createQuoteNode(),
    code: () => $createCodeNode(),
  };
  type blockHandlersType = keyof typeof blockHandlers;

  const listHandlers = {
    ul: INSERT_UNORDERED_LIST_COMMAND,
    ol: INSERT_ORDERED_LIST_COMMAND,
  };
  type listHandlersType = keyof typeof listHandlers;

  const handleBlockFormat = (event: SelectChangeEvent) => {
    const type = event?.target.value as blockHandlersType | listHandlersType;

    if (Object.keys(blockHandlers).includes(type) && blockType !== type) {
      editor.update(() => {
        const blockHandler = blockHandlers[type as blockHandlersType];
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, blockHandler as () => ElementNode);
        }
      });
    } else if (Object.keys(listHandlers).includes(type)) {
      if (blockType !== type) {
        editor.dispatchCommand(
          listHandlers[type as listHandlersType],
          undefined
        );
      } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      }
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
        }}
      >
        <IconButton
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
        >
          <RedoIcon />
        </IconButton>

        {/* Block format */}
        {supportedBlockTypes.includes(blockType) && (
          <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={blockType}
                onChange={handleBlockFormat}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {supportedBlockTypes.map((s) => (
                  <MenuItem value={s} key={`blockType-${s}`}>
                    {
                      blockTypeToBlockName[
                        s as keyof typeof blockTypeToBlockName
                      ]
                    }
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {/* Text Format */}
        <ControlButtonGroup
          size="small"
          aria-label="text formatting"
          value={textFormats}
        >
          <ToggleButton
            value="bold"
            aria-label="bold"
            onClick={handleTextFormatClick}
          >
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton
            value="italic"
            aria-label="italic"
            onClick={handleTextFormatClick}
          >
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton
            value="underline"
            aria-label="underline"
            onClick={handleTextFormatClick}
          >
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton
            value="strikethrough"
            aria-label="strikethrough"
            onClick={handleTextFormatClick}
          >
            <FormatStrikethroughIcon />
          </ToggleButton>
          <ToggleButton
            value="code"
            aria-label="code"
            onClick={handleTextFormatClick}
          >
            <CodeIcon />
          </ToggleButton>
          {/* <ToggleButton value="color" aria-label="color" disabled>
            <FormatColorFillIcon />
            <ArrowDropDownIcon />
          </ToggleButton> */}
        </ControlButtonGroup>

        {/* Align */}
        {/* <ControlButtonGroup
            size="small"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justified" disabled>
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </ControlButtonGroup> */}
      </Paper>
    </div>
  );
}
