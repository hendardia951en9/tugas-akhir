import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { generateStyle } from "../../../utils/generateStyle";

//css
import "./texteditor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ props }) => {
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
    console.log("useeffect");
  }, [props.textEditorValue]);

  return (
    <section
      className="text-editor-component-container"
      onClick={props.onClick}
      style={generateStyle(props.style)}
    >
      <Editor
        editorState={textEditorValue}
        toolbarClassName="text-editor-component-toolbar"
        wrapperClassName="text-editor-component-wrapper"
        editorClassName="text-editor-component"
        toolbarHidden
      />
    </section>
  );
};

export default TextEditor;