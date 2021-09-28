import React, { useContext, useEffect, useState } from "react";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./texteditor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  const [textEditorValue, setTextEditorValue] = useState(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (props.textEditorValue == null) {
      setTextEditorValue(null);
    } else {
      setTextEditorValue(
        EditorState.createWithContent(convertFromRaw(props.textEditorValue))
      );
    }
  }, [props.textEditorValue]);

  return (
    <div
      className={`text-editor-component-container 
      ${props.style.position === "absolute" ? "isAbsolute" : ""}`}
      onClick={
        isEdit
          ? (e) => {
              if (e.target === e.currentTarget) {
                pageBuilderContext.handleClickPageBuilderComponent(
                  itemTypes,
                  componentKey
                );
              }
            }
          : undefined
      }
      style={generateStyle(props.style)}
    >
      {textEditorValue ? (
        <Editor
          editorState={textEditorValue}
          toolbarClassName="text-editor-component-toolbar"
          wrapperClassName="text-editor-component-wrapper"
          editorClassName="text-editor-component"
          readOnly={true}
          toolbarHidden={true}
        />
      ) : (
        props.text
      )}
    </div>
  );
};

export default TextEditor;
