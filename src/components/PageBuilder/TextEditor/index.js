import React, { useContext, useEffect, useState } from "react";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/Pricing";

//css
import "./texteditor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ componentKey, itemTypes, props }) => {
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
    <section
      className="text-editor-component-container"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageBuilderContext.handleClick(itemTypes, componentKey);
        }
      }}
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
    </section>
  );
};

export default TextEditor;
