import React, { useContext, useEffect, useRef, useState } from "react";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconPicker } from "react-fa-icon-picker";
import { ItemTypes } from "../../../utils/ItemTypes";
import { PropsTypes } from "../../../utils/PropsTypes";
import { PageBuilderContext } from "../../Pages/Pricing";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { SketchPicker } from "react-color";

import $ from "jquery";

//css
import "./editcomponent.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditComponent = ({ props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  const [
    isColorPickerBackgroundColorOpen,
    setIsColorPickerBackgroundColorOpen,
  ] = useState(false);
  const [isColorPickerBorderColorOpen, setIsColorPickerBorderColorOpen] =
    useState(false);
  const [isColorPickerBoxShadowColorOpen, setIsColorPickerBoxShadowColorOpen] =
    useState(false);
  const [isColorPickerColorOpen, setIsColorPickerColorOpen] = useState(false);

  const [alignItems, setAlignItems] = useState("stretch");
  const [backgroundColor, setBackgroundColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundPosition, setBackgroundPosition] = useState("left top");
  const [backgroundRepeat, setBackgroundRepeat] = useState("repeat");
  const [backgroundSize, setBackgroundSize] = useState("auto");
  const [borderBottomLeftRadiusValue, setBorderBottomLeftRadiusValue] =
    useState(0);
  const [borderBottomLeftRadiusUnit, setBorderBottomLeftRadiusUnit] =
    useState("px");
  const [borderBottomRightRadiusValue, setBorderBottomRightRadiusValue] =
    useState(0);
  const [borderBottomRightRadiusUnit, setBorderBottomRightRadiusUnit] =
    useState("px");
  const [borderBottomWidthValue, setBorderBottomWidthValue] = useState(0);
  const [borderBottomWidthUnit, setBorderBottomWidthUnit] = useState("px");
  const [borderColor, setBorderColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [borderLeftWidthValue, setBorderLeftWidthValue] = useState(0);
  const [borderLeftWidthUnit, setBorderLeftWidthUnit] = useState("px");
  const [borderRightWidthValue, setBorderRightWidthValue] = useState(0);
  const [borderRightWidthUnit, setBorderRightWidthUnit] = useState("px");
  const [borderStyle, setBorderStyle] = useState("solid");
  const [borderTopLeftRadiusValue, setBorderTopLeftRadiusValue] = useState(0);
  const [borderTopLeftRadiusUnit, setBorderTopLeftRadiusUnit] = useState("px");
  const [borderTopRightRadiusValue, setBorderTopRightRadiusValue] = useState(0);
  const [borderTopRightRadiusUnit, setBorderTopRightRadiusUnit] =
    useState("px");
  const [borderTopWidthValue, setBorderTopWidthValue] = useState(0);
  const [borderTopWidthUnit, setBorderTopWidthUnit] = useState("px");
  const [borderWeightValue, setBorderWeightValue] = useState(0);
  const [borderWeightUnit, setBorderWeightUnit] = useState("px");
  const [boxShadowBlurValue, setBoxShadowBlurValue] = useState(0);
  const [boxShadowBlurUnit, setBoxShadowBlurUnit] = useState("px");
  const [boxShadowColor, setBoxShadowColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [boxShadowInset, setBoxShadowInset] = useState("default");
  const [boxShadowSpreadValue, setBoxShadowSpreadValue] = useState(0);
  const [boxShadowSpreadUnit, setBoxShadowSpreadUnit] = useState("px");
  const [boxShadowXValue, setBoxShadowXValue] = useState(0);
  const [boxShadowXUnit, setBoxShadowXUnit] = useState("px");
  const [boxShadowYValue, setBoxShadowYValue] = useState(0);
  const [boxShadowYUnit, setBoxShadowYUnit] = useState("px");
  const [buttonAlignment, setButtonAlignment] = useState("left");
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [controls, setControls] = useState(false);
  const [dividerText, setDividerText] = useState("");
  const [fontSizeValue, setFontSizeValue] = useState(0);
  const [fontSizeUnit, setFontSizeUnit] = useState("px");
  const [fontWeight, setFontWeight] = useState("normal");
  const [gapValue, setGapValue] = useState("px");
  const [gapUnit, setGapUnit] = useState("px");
  const [heightValue, setHeightValue] = useState(0);
  const [heightUnit, setHeightUnit] = useState("auto");
  const [icon, setIcon] = useState("");
  const [imageAlignment, setImageAlignment] = useState("left");
  const [infinite, setInfinite] = useState(true);
  const innerSectionLayoutRef = useRef(null);
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [letterSpacingValue, setLetterSpacingValue] = useState(0);
  const [letterSpacingUnit, setLetterSpacingUnit] = useState("normal");
  const [lineHeightValue, setLineHeightValue] = useState(0);
  const [lineHeightUnit, setLineHeightUnit] = useState("normal");
  const [linkTo, setLinkTo] = useState("");
  const [loop, setLoop] = useState(false);
  const [marginBottomValue, setMarginBottomValue] = useState(0);
  const [marginBottomUnit, setMarginBottomUnit] = useState("px");
  const [marginLeftValue, setMarginLeftValue] = useState(0);
  const [marginLeftUnit, setMarginLeftUnit] = useState("px");
  const [marginRightValue, setMarginRightValue] = useState(0);
  const [marginRightUnit, setMarginRightUnit] = useState("px");
  const [marginTopValue, setMarginTopValue] = useState(0);
  const [marginTopUnit, setMarginTopUnit] = useState("px");
  const [maxWidthValue, setMaxWidthValue] = useState(0);
  const [maxWidthUnit, setMaxWidthUnit] = useState("auto");
  const [minHeightValue, setMinHeightValue] = useState(0);
  const [minHeightUnit, setMinHeightUnit] = useState("auto");
  const [muted, setMuted] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [overflow, setOverflow] = useState("visible");
  const [paddingBottomValue, setPaddingBottomValue] = useState(0);
  const [paddingBottomUnit, setPaddingBottomUnit] = useState("px");
  const [paddingLeftValue, setPaddingLeftValue] = useState(0);
  const [paddingLeftUnit, setPaddingLeftUnit] = useState("px");
  const [paddingRightValue, setPaddingRightValue] = useState(0);
  const [paddingRightUnit, setPaddingRightUnit] = useState("px");
  const [paddingTopValue, setPaddingTopValue] = useState(0);
  const [paddingTopUnit, setPaddingTopUnit] = useState("px");
  const [playing, setPlaying] = useState(false);
  const [showBullets, setShowBullets] = useState(true);
  const [showFullscreenButton, setShowFullscreenButton] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [slideInterval, setSlideInterval] = useState(3000);
  const [source, setSource] = useState(false);
  const [starRatingCap, setStarRatingCap] = useState(0);
  const [starRatingValue, setStarRatingValue] = useState(0);
  const [text, setText] = useState("");
  const [textAlign, setTextAlign] = useState("left");
  const [textDecoration, setTextDecoration] = useState("none");
  const [textEditorValue, setTextEditorValue] = useState(() =>
    EditorState.createEmpty()
  );
  const [textTransform, setTextTransform] = useState("none");
  const [thumbnailPosition, setThumbnailPosition] = useState("bottom");
  const [widthValue, setWidthValue] = useState(0);
  const [widthUnit, setWidthUnit] = useState("auto");
  const [zIndex, setZIndex] = useState("auto");

  const handleClickColorPickerBackgroundColor = () => {
    setIsColorPickerBackgroundColorOpen(!isColorPickerBackgroundColorOpen);
    setIsColorPickerBorderColorOpen(false);
    setIsColorPickerBoxShadowColorOpen(false);
    setIsColorPickerColorOpen(false);
  };

  const handleClickColorPickerBorderColor = () => {
    setIsColorPickerBackgroundColorOpen(false);
    setIsColorPickerBorderColorOpen(!isColorPickerBorderColorOpen);
    setIsColorPickerBoxShadowColorOpen(false);
    setIsColorPickerColorOpen(false);
  };

  const handleClickColorPickerBoxShadowColor = () => {
    setIsColorPickerBackgroundColorOpen(false);
    setIsColorPickerBorderColorOpen(false);
    setIsColorPickerBoxShadowColorOpen(!isColorPickerBoxShadowColorOpen);
    setIsColorPickerColorOpen(false);
  };

  const handleClickColorPickerColor = () => {
    setIsColorPickerBackgroundColorOpen(false);
    setIsColorPickerBorderColorOpen(false);
    setIsColorPickerBoxShadowColorOpen(false);
    setIsColorPickerColorOpen(!isColorPickerColorOpen);
  };

  const handleClickInnerSectionLayout = () => {
    innerSectionLayoutRef.current.value =
      parseInt(innerSectionLayoutRef.current.value) + 1;
    pageBuilderContext.editComponentProps(
      PropsTypes.INNER_SECTION_LAYOUT,
      "value",
      innerSectionLayoutRef.current.value
    );
  };

  useEffect(() => {
    if (pageBuilderContext.boardState.getComponentData) {
      pageBuilderContext.boardState.getComponentData = false;
      setIsColorPickerBackgroundColorOpen(false);
      setIsColorPickerBorderColorOpen(false);
      setIsColorPickerBoxShadowColorOpen(false);
      setIsColorPickerColorOpen(false);

      if (props.componentEditableProps.alignItems) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setAlignItems(
            props.componentProps.dividerTextContainerStyle.alignItems
          );
        } else {
          setAlignItems(props.componentProps.style.alignItems);
        }
      }
      if (props.componentEditableProps.backgroundColor) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setBackgroundColor(
            props.componentProps.dividerTextStyle.backgroundColor
          );
        } else {
          setBackgroundColor(props.componentProps.style.backgroundColor);
        }
      }
      if (props.componentEditableProps.backgroundImage) {
        setBackgroundImage(
          props.componentProps.style.backgroundImage.substring(
            5,
            props.componentProps.style.backgroundImage.lastIndexOf("'")
          )
        );
      }
      if (props.componentEditableProps.backgroundPosition) {
        setBackgroundPosition(props.componentProps.style.backgroundPosition);
      }
      if (props.componentEditableProps.backgroundRepeat) {
        setBackgroundRepeat(props.componentProps.style.backgroundRepeat);
      }
      if (props.componentEditableProps.backgroundSize) {
        setBackgroundSize(props.componentProps.style.backgroundSize);
      }
      if (props.componentEditableProps.borderBottomLeftRadius) {
        setBorderBottomLeftRadiusValue(
          props.componentProps.style.borderBottomLeftRadius.value
        );
        setBorderBottomLeftRadiusUnit(
          props.componentProps.style.borderBottomLeftRadius.unit
        );
      }
      if (props.componentEditableProps.borderBottomRightRadius) {
        setBorderBottomRightRadiusValue(
          props.componentProps.style.borderBottomRightRadius.value
        );
        setBorderBottomRightRadiusUnit(
          props.componentProps.style.borderBottomRightRadius.unit
        );
      }
      if (props.componentEditableProps.borderBottomWidth) {
        setBorderBottomWidthValue(
          props.componentProps.style.borderBottomWidth.value
        );
        setBorderBottomWidthUnit(
          props.componentProps.style.borderBottomWidth.unit
        );
      }
      if (props.componentEditableProps.borderColor) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setBorderColor(
            props.componentProps.dividerStyle.borderProps.borderColor
          );
        } else {
          setBorderColor(props.componentProps.style.borderColor);
        }
      }
      if (props.componentEditableProps.borderLeftWidth) {
        setBorderLeftWidthValue(
          props.componentProps.style.borderLeftWidth.value
        );
        setBorderLeftWidthUnit(props.componentProps.style.borderLeftWidth.unit);
      }
      if (props.componentEditableProps.borderRightWidth) {
        setBorderRightWidthValue(
          props.componentProps.style.borderRightWidth.value
        );
        setBorderRightWidthUnit(
          props.componentProps.style.borderRightWidth.unit
        );
      }
      if (props.componentEditableProps.borderStyle) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setBorderStyle(
            props.componentProps.dividerStyle.borderProps.borderStyle
          );
        } else {
          setBorderStyle(props.componentProps.style.borderStyle);
        }
      }
      if (props.componentEditableProps.borderTopLeftRadius) {
        setBorderTopLeftRadiusValue(
          props.componentProps.style.borderTopLeftRadius.value
        );
        setBorderTopLeftRadiusUnit(
          props.componentProps.style.borderTopLeftRadius.unit
        );
      }
      if (props.componentEditableProps.borderTopRightRadius) {
        setBorderTopRightRadiusValue(
          props.componentProps.style.borderTopRightRadius.value
        );
        setBorderTopRightRadiusUnit(
          props.componentProps.style.borderTopRightRadius.unit
        );
      }
      if (props.componentEditableProps.borderTopWidth) {
        setBorderTopWidthValue(props.componentProps.style.borderTopWidth.value);
        setBorderTopWidthUnit(props.componentProps.style.borderTopWidth.unit);
      }
      if (props.componentEditableProps.borderWeight) {
        setBorderWeightValue(
          props.componentProps.dividerStyle.borderProps.borderWeight.value
        );
        setBorderWeightUnit(
          props.componentProps.dividerStyle.borderProps.borderWeight.unit
        );
      }
      if (props.componentEditableProps.boxShadowBlur) {
        setBoxShadowBlurValue(
          props.componentProps.style.boxShadowProps.boxShadowBlur.value
        );
        setBoxShadowBlurUnit(
          props.componentProps.style.boxShadowProps.boxShadowBlur.unit
        );
      }
      if (props.componentEditableProps.boxShadowColor) {
        setBoxShadowColor(
          props.componentProps.style.boxShadowProps.boxShadowColor
        );
      }
      if (props.componentEditableProps.boxShadowInset) {
        setBoxShadowInset(
          props.componentProps.style.boxShadowProps.boxShadowInset
        );
      }
      if (props.componentEditableProps.boxShadowSpread) {
        setBoxShadowSpreadValue(
          props.componentProps.style.boxShadowProps.boxShadowSpread.value
        );
        setBoxShadowSpreadUnit(
          props.componentProps.style.boxShadowProps.boxShadowSpread.unit
        );
      }
      if (props.componentEditableProps.boxShadowX) {
        setBoxShadowXValue(
          props.componentProps.style.boxShadowProps.boxShadowX.value
        );
        setBoxShadowXUnit(
          props.componentProps.style.boxShadowProps.boxShadowX.unit
        );
      }
      if (props.componentEditableProps.boxShadowY) {
        setBoxShadowYValue(
          props.componentProps.style.boxShadowProps.boxShadowY.value
        );
        setBoxShadowYUnit(
          props.componentProps.style.boxShadowProps.boxShadowY.unit
        );
      }
      if (props.componentEditableProps.buttonAlignment) {
        setButtonAlignment(props.componentProps.buttonAlignment);
      }
      if (props.componentEditableProps.color) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setColor(props.componentProps.dividerTextContainerStyle.color);
        } else {
          setColor(props.componentProps.style.color);
        }
      }
      if (props.componentEditableProps.controls) {
        setControls(props.componentProps.controls);
      }
      if (props.componentEditableProps.dividerText) {
        setDividerText(props.componentProps.dividerText);
      }
      if (props.componentEditableProps.fontSize) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setFontSizeValue(
            props.componentProps.dividerTextContainerStyle.fontSize.value
          );
          setFontSizeUnit(
            props.componentProps.dividerTextContainerStyle.fontSize.unit
          );
        } else {
          setFontSizeValue(props.componentProps.style.fontSize.value);
          setFontSizeUnit(props.componentProps.style.fontSize.unit);
        }
      }
      if (props.componentEditableProps.fontWeight) {
        setFontWeight(props.componentProps.style.fontWeight);
      }
      if (props.componentEditableProps.gap) {
        setGapValue(props.componentProps.style.gap.value);
        setGapUnit(props.componentProps.style.gap.unit);
      }
      if (props.componentEditableProps.height) {
        setHeightValue(props.componentProps.style.height.value);
        setHeightUnit(props.componentProps.style.height.unit);
      }
      if (props.componentEditableProps.icon) {
        setIcon(props.componentProps.icon);
      }
      if (props.componentEditableProps.imageAlignment) {
        setImageAlignment(props.componentProps.imageAlignment);
      }
      if (props.componentEditableProps.infinite) {
        setInfinite(props.componentProps.infinite);
      }
      if (props.componentEditableProps.innerSectionLayout) {
        innerSectionLayoutRef.current.value =
          props.componentProps.children.length;
      }
      if (props.componentEditableProps.justifyContent) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setJustifyContent(
            props.componentProps.dividerTextContainerStyle.justifyContent
          );
        } else {
          setJustifyContent(props.componentProps.style.justifyContent);
        }
      }
      if (props.componentEditableProps.letterSpacing) {
        setLineHeightValue(props.componentProps.style.letterSpacing.value);
        setLineHeightUnit(props.componentProps.style.letterSpacing.unit);
      }
      if (props.componentEditableProps.lineHeight) {
        setLineHeightValue(props.componentProps.style.lineHeight.value);
        setLineHeightUnit(props.componentProps.style.lineHeight.unit);
      }
      if (props.componentEditableProps.linkTo) {
        setLinkTo(props.componentProps.linkTo);
      }
      if (props.componentEditableProps.loop) {
        setLoop(props.componentProps.loop);
      }
      if (props.componentEditableProps.marginBottom) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setMarginBottomValue(
            props.componentProps.dividerStyle.marginBottom.value
          );
          setMarginBottomUnit(
            props.componentProps.dividerStyle.marginBottom.unit
          );
        } else {
          setMarginBottomValue(props.componentProps.style.marginBottom.value);
          setMarginBottomUnit(props.componentProps.style.marginBottom.unit);
        }
      }
      if (props.componentEditableProps.marginLeft) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setMarginLeftValue(
            props.componentProps.dividerStyle.marginLeft.value
          );
          setMarginLeftUnit(props.componentProps.dividerStyle.marginLeft.unit);
        } else {
          setMarginLeftValue(props.componentProps.style.marginLeft.value);
          setMarginLeftUnit(props.componentProps.style.marginLeft.unit);
        }
      }
      if (props.componentEditableProps.marginRight) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setMarginRightValue(
            props.componentProps.dividerStyle.marginRight.value
          );
          setMarginRightUnit(
            props.componentProps.dividerStyle.marginRight.unit
          );
        } else {
          setMarginRightValue(props.componentProps.style.marginRight.value);
          setMarginRightUnit(props.componentProps.style.marginRight.unit);
        }
      }
      if (props.componentEditableProps.marginTop) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setMarginTopValue(props.componentProps.dividerStyle.marginTop.value);
          setMarginTopUnit(props.componentProps.dividerStyle.marginTop.unit);
        } else {
          setMarginTopValue(props.componentProps.style.marginTop.value);
          setMarginTopUnit(props.componentProps.style.marginTop.unit);
        }
      }
      if (props.componentEditableProps.maxWidth) {
        setMaxWidthValue(props.componentProps.style.maxWidth.value);
        setMaxWidthUnit(props.componentProps.style.maxWidth.unit);
      }
      if (props.componentEditableProps.minHeight) {
        setMinHeightValue(props.componentProps.style.minHeight.value);
        setMinHeightUnit(props.componentProps.style.minHeight.unit);
      }
      if (props.componentEditableProps.muted) {
        setMuted(props.componentProps.muted);
      }
      if (props.componentEditableProps.opacity) {
        setOpacity(props.componentProps.style.opacity);
      }
      if (props.componentEditableProps.overflow) {
        setOverflow(props.componentProps.style.overflow);
      }
      if (props.componentEditableProps.paddingBottom) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setPaddingBottomValue(
            props.componentProps.dividerStyle.paddingBottom.value
          );
          setPaddingBottomUnit(
            props.componentProps.dividerStyle.paddingBottom.unit
          );
        } else {
          setPaddingBottomValue(props.componentProps.style.paddingBottom.value);
          setPaddingBottomUnit(props.componentProps.style.paddingBottom.unit);
        }
      }
      if (props.componentEditableProps.paddingLeft) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setPaddingLeftValue(
            props.componentProps.dividerStyle.paddingLeft.value
          );
          setPaddingLeftUnit(
            props.componentProps.dividerStyle.paddingLeft.unit
          );
        } else {
          setPaddingLeftValue(props.componentProps.style.paddingLeft.value);
          setPaddingLeftUnit(props.componentProps.style.paddingLeft.unit);
        }
      }
      if (props.componentEditableProps.paddingRight) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setPaddingRightValue(
            props.componentProps.dividerStyle.paddingRight.value
          );
          setPaddingRightUnit(
            props.componentProps.dividerStyle.paddingRight.unit
          );
        } else {
          setPaddingRightValue(props.componentProps.style.paddingRight.value);
          setPaddingRightUnit(props.componentProps.style.paddingRight.unit);
        }
      }
      if (props.componentEditableProps.paddingTop) {
        if (props.itemTypes === ItemTypes.DIVIDER) {
          setPaddingTopValue(
            props.componentProps.dividerStyle.paddingTop.value
          );
          setPaddingTopUnit(props.componentProps.dividerStyle.paddingTop.unit);
        } else {
          setPaddingTopValue(props.componentProps.style.paddingTop.value);
          setPaddingTopUnit(props.componentProps.style.paddingTop.unit);
        }
      }
      if (props.componentEditableProps.playing) {
        setPlaying(props.componentProps.playing);
      }
      if (props.componentEditableProps.showBullets) {
        setShowBullets(props.componentProps.showBullets);
      }
      if (props.componentEditableProps.showFullscreenButton) {
        setShowFullscreenButton(props.componentProps.showFullscreenButton);
      }
      if (props.componentEditableProps.showNav) {
        setShowNav(props.componentProps.showNav);
      }
      if (props.componentEditableProps.showPlayButton) {
        setShowPlayButton(props.componentProps.showPlayButton);
      }
      if (props.componentEditableProps.showThumbnails) {
        setShowThumbnails(props.componentProps.showThumbnails);
      }
      if (props.componentEditableProps.slideInterval) {
        setSlideInterval(props.componentProps.slideInterval);
      }
      if (props.componentEditableProps.source) {
        setSource(props.componentProps.source);
      }
      if (props.componentEditableProps.starRatingCap) {
        setStarRatingCap(props.componentProps.starRatingCap);
      }
      if (props.componentEditableProps.starRatingValue) {
        setStarRatingValue(props.componentProps.starRatingValue);
      }
      if (props.componentEditableProps.text) {
        setText(props.componentProps.text);
      }
      if (props.componentEditableProps.textAlign) {
        setTextAlign(props.componentProps.style.textAlign);
      }
      if (props.componentEditableProps.textDecoration) {
        setTextDecoration(props.componentProps.style.textDecoration);
      }
      if (props.componentEditableProps.textEditorValue) {
        if (props.componentProps.textEditorValue == null) {
          setTextEditorValue(null);
        } else {
          setTextEditorValue(
            EditorState.createWithContent(
              convertFromRaw(props.componentProps.textEditorValue)
            )
          );
        }
      }
      if (props.componentEditableProps.textTransform) {
        setTextTransform(props.componentProps.style.textTransform);
      }
      if (props.componentEditableProps.thumbnailPosition) {
        setThumbnailPosition(props.componentProps.thumbnailPosition);
      }
      if (props.componentEditableProps.width) {
        setWidthValue(props.componentProps.style.width.value);
        setWidthUnit(props.componentProps.style.width.unit);
      }
      if (props.componentEditableProps.zIndex) {
        setZIndex(props.componentProps.style.zIndex);
      }
    }
  }, [pageBuilderContext, props]);

  useEffect(() => {
    $("input").each(function () {
      if ($(this).val().length > 0) {
        $(this).addClass("not-empty");
      } else {
        $(this).removeClass("not-empty");
      }

      $(this).on("change", function () {
        if ($(this).val().length > 0) {
          $(this).addClass("not-empty");
        } else {
          $(this).removeClass("not-empty");
        }
      });
    });
  });

  console.log("render edit component");

  return (
    <section className="edit-component-container">
      {/* align items */}
      {props.componentEditableProps.alignItems && (
        <div className="form-input">
          <select
            id="alignItems"
            name="alignItems"
            onChange={(e) => {
              setAlignItems(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.ALIGN_ITEMS,
                "",
                e.target.value
              );
            }}
            value={alignItems}
          >
            {props.componentEditableProps.alignItems.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="alignItems">
            <span>{PropsTypes.ALIGN_ITEMS}</span>
          </label>
        </div>
      )}
      {/* background color */}
      {props.componentEditableProps.backgroundColor && (
        <div className="color-picker-input">
          <label htmlFor="">
            <span>{PropsTypes.BACKGROUND_COLOR}</span>
          </label>
          <div className="color-picker-button-wrapper">
            <button
              className="color-picker-button"
              style={{
                backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
              }}
            ></button>
            <FontAwesomeIcon
              className="color-picker-icon"
              icon={faPalette}
              onClick={handleClickColorPickerBackgroundColor}
            />
            {isColorPickerBackgroundColorOpen && (
              <div className="color-picker-container">
                <SketchPicker
                  style={{ zIndex: "99" }}
                  color={backgroundColor}
                  onChange={(color) => {
                    setBackgroundColor(color.rgb);
                    pageBuilderContext.editComponentProps(
                      PropsTypes.BACKGROUND_COLOR,
                      "",
                      color.rgb
                    );
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* background image */}
      {props.componentEditableProps.backgroundImage && (
        <div className="form-input">
          <input
            id="backgroundImage"
            name="backgroundImage"
            onChange={(e) => {
              setBackgroundImage(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BACKGROUND_IMAGE,
                "value",
                e.target.value || ""
              );
            }}
            type="text"
            value={backgroundImage}
          />
          <label htmlFor="backgroundImage">
            <span>{PropsTypes.BACKGROUND_IMAGE}</span>
          </label>
        </div>
      )}
      {/* background position */}
      {props.componentEditableProps.backgroundPosition && (
        <div className="form-input">
          <select
            id="backgroundPosition"
            name="backgroundPosition"
            onChange={(e) => {
              setBackgroundPosition(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BACKGROUND_POSITION,
                "",
                e.target.value
              );
            }}
            value={backgroundPosition}
          >
            {props.componentEditableProps.backgroundPosition.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                );
              }
            )}
          </select>
          <label htmlFor="backgroundPosition">
            <span>{PropsTypes.BACKGROUND_POSITION}</span>
          </label>
        </div>
      )}
      {/* background repeat */}
      {props.componentEditableProps.backgroundRepeat && (
        <div className="form-input">
          <select
            id="backgroundRepeat"
            name="backgroundRepeat"
            onChange={(e) => {
              setBackgroundRepeat(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BACKGROUND_REPEAT,
                "",
                e.target.value
              );
            }}
            value={backgroundRepeat}
          >
            {props.componentEditableProps.backgroundRepeat.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                );
              }
            )}
          </select>
          <label htmlFor="backgroundRepeat">
            <span>{PropsTypes.BACKGROUND_REPEAT}</span>
          </label>
        </div>
      )}
      {/* background size */}
      {props.componentEditableProps.backgroundSize && (
        <div className="form-input">
          <select
            id="backgroundSize"
            name="backgroundSize"
            onChange={(e) => {
              setBackgroundSize(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BACKGROUND_SIZE,
                "",
                e.target.value
              );
            }}
            value={backgroundSize}
          >
            {props.componentEditableProps.backgroundSize.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="backgroundSize">
            <span>{PropsTypes.BACKGROUND_SIZE}</span>
          </label>
        </div>
      )}
      {/* border bottom left radius */}
      {props.componentEditableProps.borderBottomLeftRadius && (
        <div className="form-input">
          <input
            id="borderBottomLeftRadius"
            min="0"
            name="borderBottomLeftRadius"
            onChange={(e) => {
              setBorderBottomLeftRadiusValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_BOTTOM_LEFT_RADIUS,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={borderBottomLeftRadiusValue}
          />
          <label htmlFor="borderBottomLeftRadiusValue">
            <span>{PropsTypes.BORDER_BOTTOM_LEFT_RADIUS}</span>
          </label>
          <select
            id="borderBottomLeftRadiusUnit"
            name="borderBottomLeftRadiusUnit"
            onChange={(e) => {
              setBorderBottomLeftRadiusUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_BOTTOM_LEFT_RADIUS,
                "unit",
                e.target.value
              );
            }}
            value={borderBottomLeftRadiusUnit}
          >
            {props.componentEditableProps.borderBottomLeftRadius.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                );
              }
            )}
          </select>
        </div>
      )}
      {/* border bottom right radius */}
      {props.componentEditableProps.borderBottomRightRadius && (
        <div className="form-input">
          <input
            id="borderBottomRightRadius"
            min="0"
            name="borderBottomRightRadius"
            onChange={(e) => {
              setBorderBottomRightRadiusValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_BOTTOM_RIGHT_RADIUS,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={borderBottomRightRadiusValue}
          />
          <label htmlFor="borderBottomRightRadiusValue">
            <span>{PropsTypes.BORDER_BOTTOM_RIGHT_RADIUS}</span>
          </label>
          <select
            id="borderBottomRightRadiusUnit"
            name="borderBottomRightRadiusUnit"
            onChange={(e) => {
              setBorderBottomRightRadiusUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_BOTTOM_RIGHT_RADIUS,
                "unit",
                e.target.value
              );
            }}
            value={borderBottomRightRadiusUnit}
          >
            {props.componentEditableProps.borderBottomRightRadius.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                );
              }
            )}
          </select>
        </div>
      )}
      {/* border bottom width */}
      {props.componentEditableProps.borderBottomWidth && (
        <div className="form-input">
          <input
            id="borderBottomWidthValue"
            min="0"
            name="borderBottomWidthValue"
            onChange={(e) => {
              setBorderBottomWidthValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_BOTTOM_WIDTH,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={borderBottomWidthValue}
          />
          <label htmlFor="borderBottomWidthValue">
            <span>{PropsTypes.BORDER_BOTTOM_WIDTH}</span>
          </label>
          <select
            id="borderBottomWidthUnit"
            name="borderBottomWidthUnit"
            onChange={(e) => {
              setBorderBottomWidthUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_BOTTOM_WIDTH,
                "unit",
                e.target.value
              );
            }}
            value={borderBottomWidthUnit}
          >
            {props.componentEditableProps.borderBottomWidth.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                );
              }
            )}
          </select>
        </div>
      )}
      {/* border color */}
      {props.componentEditableProps.borderColor && (
        <div className="color-picker-input">
          <label htmlFor="">
            <span>{PropsTypes.BORDER_COLOR}</span>
          </label>
          <div className="color-picker-button-wrapper">
            <button
              className="color-picker-button"
              style={{
                backgroundColor: `rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${borderColor.a})`,
              }}
            ></button>
            <FontAwesomeIcon
              className="color-picker-icon"
              icon={faPalette}
              onClick={handleClickColorPickerBorderColor}
            />
            {isColorPickerBorderColorOpen && (
              <div className="color-picker-container">
                <SketchPicker
                  style={{ zIndex: "99" }}
                  color={borderColor}
                  onChange={(color) => {
                    setBorderColor(color.rgb);
                    pageBuilderContext.editComponentProps(
                      PropsTypes.BORDER_COLOR,
                      "",
                      color.rgb
                    );
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* border left width */}
      {props.componentEditableProps.borderLeftWidth && (
        <div className="form-input">
          <input
            id="borderLeftWidthValue"
            min="0"
            name="borderLeftWidthValue"
            onChange={(e) => {
              setBorderLeftWidthValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_LEFT_WIDTH,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={borderLeftWidthValue}
          />
          <label htmlFor="borderLeftWidthValue">
            <span>{PropsTypes.BORDER_LEFT_WIDTH}</span>
          </label>
          <select
            id="borderLeftWidthUnit"
            name="borderLeftWidthUnit"
            onChange={(e) => {
              setBorderLeftWidthUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_LEFT_WIDTH,
                "unit",
                e.target.value
              );
            }}
            value={borderLeftWidthUnit}
          >
            {props.componentEditableProps.borderLeftWidth.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* border right width */}
      {props.componentEditableProps.borderRightWidth && (
        <div className="form-input">
          <input
            id="borderRightWidthValue"
            min="0"
            name="borderRightWidthValue"
            onChange={(e) => {
              setBorderRightWidthValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_RIGHT_WIDTH,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={borderRightWidthValue}
          />
          <label htmlFor="borderRightWidthValue">
            <span>{PropsTypes.BORDER_RIGHT_WIDTH}</span>
          </label>
          <select
            id="borderRightWidthUnit"
            name="borderRightWidthUnit"
            onChange={(e) => {
              setBorderRightWidthUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_RIGHT_WIDTH,
                "unit",
                e.target.value
              );
            }}
            value={borderRightWidthUnit}
          >
            {props.componentEditableProps.borderRightWidth.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                );
              }
            )}
          </select>
        </div>
      )}
      {/* border style */}
      {props.componentEditableProps.borderStyle && (
        <div className="form-input">
          <select
            id="borderStyle"
            name="borderStyle"
            onChange={(e) => {
              setBorderStyle(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_STYLE,
                "",
                e.target.value
              );
            }}
            value={borderStyle}
          >
            {props.componentEditableProps.borderStyle.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="borderStyle">
            <span>{PropsTypes.BORDER_STYLE}</span>
          </label>
        </div>
      )}
      {/* border top left radius */}
      {props.componentEditableProps.borderTopLeftRadius && (
        <div className="form-input">
          <input
            id="borderTopLeftRadius"
            min="0"
            name="borderTopLeftRadius"
            onChange={(e) => {
              setBorderTopLeftRadiusValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_TOP_LEFT_RADIUS,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={borderTopLeftRadiusValue}
          />
          <label htmlFor="borderTopLeftRadiusValue">
            <span>{PropsTypes.BORDER_TOP_LEFT_RADIUS}</span>
          </label>
          <select
            id="borderTopLeftRadiusUnit"
            name="borderTopLeftRadiusUnit"
            onChange={(e) => {
              setBorderTopLeftRadiusUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_TOP_LEFT_RADIUS,
                "unit",
                e.target.value
              );
            }}
            value={borderTopLeftRadiusUnit}
          >
            {props.componentEditableProps.borderTopLeftRadius.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                );
              }
            )}
          </select>
        </div>
      )}
      {/* border top right radius */}
      {props.componentEditableProps.borderTopLeftRadius && (
        <div className="form-input">
          <input
            id="borderTopRightRadius"
            min="0"
            name="borderTopRightRadius"
            onChange={(e) => {
              setBorderTopRightRadiusValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_TOP_RIGHT_RADIUS,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={borderTopRightRadiusValue}
          />
          <label htmlFor="borderTopRightRadiusValue">
            <span>{PropsTypes.BORDER_TOP_RIGHT_RADIUS}</span>
          </label>
          <select
            id="borderTopRightRadiusUnit"
            name="borderTopRightRadiusUnit"
            onChange={(e) => {
              setBorderTopRightRadiusUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_TOP_RIGHT_RADIUS,
                "unit",
                e.target.value
              );
            }}
            value={borderTopRightRadiusUnit}
          >
            {props.componentEditableProps.borderTopRightRadius.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                );
              }
            )}
          </select>
        </div>
      )}
      {/* border top width */}
      {props.componentEditableProps.borderTopWidth && (
        <div className="form-input">
          <input
            id="borderTopWidthValue"
            min="0"
            name="borderTopWidthValue"
            onChange={(e) => {
              setBorderTopWidthValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_TOP_WIDTH,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={borderTopWidthValue}
          />
          <label htmlFor="borderTopWidthValue">
            <span>{PropsTypes.BORDER_TOP_WIDTH}</span>
          </label>
          <select
            id="borderTopWidthUnit"
            name="borderTopWidthUnit"
            onChange={(e) => {
              setBorderTopWidthUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_TOP_WIDTH,
                "unit",
                e.target.value
              );
            }}
            value={borderTopWidthUnit}
          >
            {props.componentEditableProps.borderTopWidth.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* border top width */}
      {props.componentEditableProps.borderWeight && (
        <div className="form-input">
          <input
            id="borderWeightValue"
            min="0"
            name="borderWeightValue"
            onChange={(e) => {
              setBorderWeightValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_WEIGHT,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={borderWeightValue}
          />
          <label htmlFor="borderWeightValue">
            <span>{PropsTypes.BORDER_WEIGHT}</span>
          </label>
          <select
            id="borderWeightUnit"
            name="borderWeightUnit"
            onChange={(e) => {
              setBorderWeightUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BORDER_WEIGHT,
                "unit",
                e.target.value
              );
            }}
            value={borderWeightUnit}
          >
            {props.componentEditableProps.borderWeight.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* box shadow blur */}
      {props.componentEditableProps.boxShadowBlur && (
        <div className="form-input">
          <input
            id="boxShadowBlur"
            min="0"
            name="boxShadowBlur"
            onChange={(e) => {
              setBoxShadowBlurValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BOX_SHADOW_BLUR,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={boxShadowBlurValue}
          />
          <label htmlFor="boxShadowBlurValue">
            <span>{PropsTypes.BOX_SHADOW_BLUR}</span>
          </label>
          <select
            id="boxShadowBlurUnit"
            name="boxShadowBlurUnit"
            onChange={(e) => {
              setBoxShadowBlurUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BOX_SHADOW_BLUR,
                "unit",
                e.target.value
              );
            }}
            value={boxShadowBlurUnit}
          >
            {props.componentEditableProps.boxShadowBlur.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* box shadow color */}
      {props.componentEditableProps.boxShadowColor && (
        <div className="color-picker-input">
          <label htmlFor="">
            <span>{PropsTypes.BOX_SHADOW_COLOR}</span>
          </label>
          <div className="color-picker-button-wrapper">
            <button
              className="color-picker-button"
              style={{
                backgroundColor: `rgba(${boxShadowColor.r}, ${boxShadowColor.g}, ${boxShadowColor.b}, ${boxShadowColor.a})`,
              }}
            ></button>
            <FontAwesomeIcon
              className="color-picker-icon"
              icon={faPalette}
              onClick={handleClickColorPickerBoxShadowColor}
            />
            {isColorPickerBoxShadowColorOpen && (
              <div className="color-picker-container">
                <SketchPicker
                  style={{ zIndex: "99" }}
                  color={boxShadowColor}
                  onChange={(color) => {
                    setBoxShadowColor(color.rgb);
                    pageBuilderContext.editComponentProps(
                      PropsTypes.BOX_SHADOW_COLOR,
                      "",
                      color.rgb
                    );
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* box shadow inset */}
      {props.componentEditableProps.boxShadowInset && (
        <div className="form-input">
          <select
            id="boxShadowInset"
            name="boxShadowInset"
            onChange={(e) => {
              setBoxShadowInset(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BOX_SHADOW_INSET,
                "",
                e.target.value
              );
            }}
            value={boxShadowInset}
          >
            {props.componentEditableProps.boxShadowInset.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit === "" ? "default" : unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="boxShadowInset">
            <span>{PropsTypes.BOX_SHADOW_INSET}</span>
          </label>
        </div>
      )}
      {/* box shadow spread */}
      {props.componentEditableProps.boxShadowSpread && (
        <div className="form-input">
          <input
            id="boxShadowSpread"
            min="0"
            name="boxShadowSpread"
            onChange={(e) => {
              setBoxShadowSpreadValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BOX_SHADOW_SPREAD,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={boxShadowSpreadValue}
          />
          <label htmlFor="boxShadowSpreadValue">
            <span>{PropsTypes.BOX_SHADOW_SPREAD}</span>
          </label>
          <select
            id="boxShadowSpreadUnit"
            name="boxShadowSpreadUnit"
            onChange={(e) => {
              setBoxShadowSpreadUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BOX_SHADOW_SPREAD,
                "unit",
                e.target.value
              );
            }}
            value={boxShadowSpreadUnit}
          >
            {props.componentEditableProps.boxShadowSpread.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* box shadow x */}
      {props.componentEditableProps.boxShadowX && (
        <div className="form-input">
          <input
            id="boxShadowX"
            min="0"
            name="boxShadowX"
            onChange={(e) => {
              setBoxShadowXValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BOX_SHADOW_X,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={boxShadowXValue}
          />
          <label htmlFor="boxShadowXValue">
            <span>{PropsTypes.BOX_SHADOW_X}</span>
          </label>
          <select
            id="boxShadowXUnit"
            name="boxShadowXUnit"
            onChange={(e) => {
              setBoxShadowXUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BOX_SHADOW_X,
                "unit",
                e.target.value
              );
            }}
            value={boxShadowXUnit}
          >
            {props.componentEditableProps.boxShadowX.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* box shadow y */}
      {props.componentEditableProps.boxShadowX && (
        <div className="form-input">
          <input
            id="boxShadowY"
            min="0"
            name="boxShadowY"
            onChange={(e) => {
              setBoxShadowYValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BOX_SHADOW_Y,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={boxShadowYValue}
          />
          <label htmlFor="boxShadowYValue">
            <span>{PropsTypes.BOX_SHADOW_Y}</span>
          </label>
          <select
            id="boxShadowYUnit"
            name="boxShadowYUnit"
            onChange={(e) => {
              setBoxShadowYUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BOX_SHADOW_Y,
                "unit",
                e.target.value
              );
            }}
            value={boxShadowYUnit}
          >
            {props.componentEditableProps.boxShadowY.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* button alignment */}
      {props.componentEditableProps.buttonAlignment && (
        <div className="form-input">
          <select
            id="buttonAlignment"
            name="buttonAlignment"
            onChange={(e) => {
              setButtonAlignment(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.BUTTON_ALIGNMENT,
                "",
                e.target.value
              );
            }}
            value={buttonAlignment}
          >
            {props.componentEditableProps.buttonAlignment.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="buttonAlignment">
            <span>{PropsTypes.BUTTON_ALIGNMENT}</span>
          </label>
        </div>
      )}
      {/* controls */}
      {props.componentEditableProps.controls && (
        <div className="form-input">
          <select
            id="controls"
            name="controls"
            onChange={(e) => {
              setControls(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.CONTROLS,
                "",
                e.target.value
              );
            }}
            value={controls}
          >
            {props.componentEditableProps.controls.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit ? "Enable" : "Disable"}
                </option>
              );
            })}
          </select>
          <label htmlFor="controls">
            <span>{PropsTypes.CONTROLS}</span>
          </label>
        </div>
      )}
      {/* color */}
      {props.componentEditableProps.color && (
        <div className="color-picker-input">
          <label htmlFor="">
            <span>{PropsTypes.COLOR}</span>
          </label>
          <div className="color-picker-button-wrapper">
            <button
              className="color-picker-button"
              style={{
                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
              }}
            ></button>
            <FontAwesomeIcon
              className="color-picker-icon"
              icon={faPalette}
              onClick={handleClickColorPickerColor}
            />
            {isColorPickerColorOpen && (
              <div className="color-picker-container">
                <SketchPicker
                  color={color}
                  onChange={(color) => {
                    setColor(color.rgb);
                    pageBuilderContext.editComponentProps(
                      PropsTypes.COLOR,
                      "",
                      color.rgb
                    );
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* divider text */}
      {props.componentEditableProps.dividerText && (
        <div className="form-input">
          <input
            id="dividerText"
            name="dividerText"
            onChange={(e) => {
              setDividerText(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.DIVIDER_TEXT,
                "",
                e.target.value
              );
            }}
            type="text"
            value={dividerText}
          />
          <label htmlFor="text">
            <span>{PropsTypes.DIVIDER_TEXT}</span>
          </label>
        </div>
      )}
      {/* font size */}
      {props.componentEditableProps.fontSize && (
        <div className="form-input">
          <input
            id="fontSizeValue"
            min="0"
            name="fontSizeValue"
            onChange={(e) => {
              setFontSizeValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.FONT_SIZE,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={fontSizeValue}
          />
          <label htmlFor="fontSizeValue">
            <span>{PropsTypes.FONT_SIZE}</span>
          </label>
          <select
            id="fontSizeUnit"
            name="fontSizeUnit"
            onChange={(e) => {
              setFontSizeUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.FONT_SIZE,
                "unit",
                e.target.value
              );
            }}
            value={fontSizeUnit}
          >
            {props.componentEditableProps.fontSize.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* font weight */}
      {props.componentEditableProps.fontWeight && (
        <div className="form-input">
          <select
            id="fontWeight"
            name="fontWeight"
            onChange={(e) => {
              setFontWeight(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.FONT_WEIGHT,
                "",
                e.target.value
              );
            }}
            value={fontWeight}
          >
            {props.componentEditableProps.fontWeight.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="fontWeight">
            <span>{PropsTypes.FONT_WEIGHT}</span>
          </label>
        </div>
      )}
      {/* gap */}
      {props.componentEditableProps.gap && (
        <div className="form-input">
          <input
            id="gapValue"
            min="0"
            name="gapValue"
            onChange={(e) => {
              setGapValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.GAP,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={gapValue}
          />
          <label htmlFor="gapValue">
            <span>{PropsTypes.GAP}</span>
          </label>
          <select
            id="gapUnit"
            name="gapUnit"
            onChange={(e) => {
              setGapUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.GAP,
                "unit",
                e.target.value
              );
            }}
            value={gapUnit}
          >
            {props.componentEditableProps.gap.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* height */}
      {props.componentEditableProps.height && (
        <div className="form-input">
          <input
            id="heightValue"
            min="0"
            name="heightValue"
            onChange={(e) => {
              setHeightValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.HEIGHT,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={heightValue}
          />
          <label htmlFor="heightValue">
            <span>{PropsTypes.HEIGHT}</span>
          </label>
          <select
            id="heightUnit"
            name="heightUnit"
            onChange={(e) => {
              setHeightUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.HEIGHT,
                "unit",
                e.target.value
              );
            }}
            value={heightUnit}
          >
            {props.componentEditableProps.height.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* icon */}
      {props.componentEditableProps.icon && (
        <div className="icon-picker-input">
          <label htmlFor="">
            <span>{PropsTypes.ICON}</span>
          </label>
          <IconPicker
            buttonStyles={{
              height: "40px",
              minHeight: "0",
              minwidth: "0",
              width: "40px",
            }}
            buttonIconStyles={{
              display: "flex",
            }}
            containerStyles={{ top: "110%", right: "0" }}
            onChange={(e) => {
              setIcon(e);
              pageBuilderContext.editComponentProps(PropsTypes.ICON, "", e);
            }}
            value={icon}
          />
        </div>
      )}
      {/* image alignment */}
      {props.componentEditableProps.imageAlignment && (
        <div className="form-input">
          <select
            id="imageAlignment"
            name="imageAlignment"
            onChange={(e) => {
              setImageAlignment(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.IMAGE_ALIGNMENT,
                "",
                e.target.value
              );
            }}
            value={imageAlignment}
          >
            {props.componentEditableProps.imageAlignment.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="imageAlignment">
            <span>{PropsTypes.IMAGE_ALIGNMENT}</span>
          </label>
        </div>
      )}
      {/* infinite */}
      {props.componentEditableProps.infinite && (
        <div className="form-input">
          <select
            id="infinite"
            name="infinite"
            onChange={(e) => {
              setInfinite(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.INFINITE,
                "",
                e.target.value
              );
            }}
            value={infinite}
          >
            {props.componentEditableProps.infinite.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit ? "Enable" : "Disable"}
                </option>
              );
            })}
          </select>
          <label htmlFor="infinite">
            <span>{PropsTypes.INFINITE}</span>
          </label>
        </div>
      )}
      {/* inner section layout */}
      {props.componentEditableProps.innerSectionLayout && (
        <div className="form-input">
          <input
            disabled={true}
            id="innerSectionLayout"
            min="0"
            name="innerSectionLayout"
            ref={innerSectionLayoutRef}
            type="number"
          />
          <label htmlFor="innerSectionLayout">
            <span>{PropsTypes.INNER_SECTION_LAYOUT}</span>
          </label>
          <button className="button" onClick={handleClickInnerSectionLayout}>
            add
            <FontAwesomeIcon icon={faColumns} />
          </button>
        </div>
      )}
      {/* justify content */}
      {props.componentEditableProps.justifyContent && (
        <div className="form-input">
          <select
            id="justifyContent"
            name="justifyContent"
            onChange={(e) => {
              setJustifyContent(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.JUSTIFY_CONTENT,
                "",
                e.target.value
              );
            }}
            value={justifyContent}
          >
            {props.componentEditableProps.justifyContent.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="justifyContent">
            <span>{PropsTypes.JUSTIFY_CONTENT}</span>
          </label>
        </div>
      )}
      {/* letter spacing */}
      {props.componentEditableProps.letterSpacing && (
        <div className="form-input">
          <input
            id="letterSpacingValue"
            min="0"
            name="letterSpacingValue"
            onChange={(e) => {
              setLetterSpacingValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.LETTER_SPACING,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={letterSpacingValue}
          />
          <label htmlFor="letterSpacingValue">
            <span>{PropsTypes.LETTER_SPACING}</span>
          </label>
          <select
            id="letterSpacingUnit"
            name="letterSpacingUnit"
            onChange={(e) => {
              setLetterSpacingUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.LETTER_SPACING,
                "unit",
                e.target.value
              );
            }}
            value={letterSpacingUnit}
          >
            {props.componentEditableProps.letterSpacing.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* line height */}
      {props.componentEditableProps.lineHeight && (
        <div className="form-input">
          <input
            id="lineHeightValue"
            min="0"
            name="lineHeightValue"
            onChange={(e) => {
              setLineHeightValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.LINE_HEIGHT,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={lineHeightValue}
          />
          <label htmlFor="lineHeightValue">
            <span>{PropsTypes.LINE_HEIGHT}</span>
          </label>
          <select
            id="lineHeightUnit"
            name="lineHeightUnit"
            onChange={(e) => {
              setLineHeightUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.LINE_HEIGHT,
                "unit",
                e.target.value
              );
            }}
            value={lineHeightUnit}
          >
            {props.componentEditableProps.lineHeight.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* link to */}
      {props.componentEditableProps.linkTo && (
        <div className="form-input">
          <input
            id="linkTo"
            name="text"
            onChange={(e) => {
              setLinkTo(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.LINK_TO,
                "value",
                e.target.value || ""
              );
            }}
            type="text"
            value={linkTo}
          />
          <label htmlFor="linkTo">
            <span>{PropsTypes.LINK_TO}</span>
          </label>
        </div>
      )}
      {/* loop */}
      {props.componentEditableProps.loop && (
        <div className="form-input">
          <select
            id="loop"
            name="loop"
            onChange={(e) => {
              setLoop(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.LOOP,
                "",
                e.target.value
              );
            }}
            value={loop}
          >
            {props.componentEditableProps.loop.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit ? "Enable" : "Disable"}
                </option>
              );
            })}
          </select>
          <label htmlFor="loop">
            <span>{PropsTypes.LOOP}</span>
          </label>
        </div>
      )}
      {/* margin bottom */}
      {props.componentEditableProps.marginBottom && (
        <div className="form-input">
          <input
            id="marginBottomValue"
            min="0"
            name="marginBottomValue"
            onChange={(e) => {
              setMarginBottomValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MARGIN_BOTTOM,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={marginBottomValue}
          />
          <label htmlFor="marginBottomValue">
            <span>{PropsTypes.MARGIN_BOTTOM}</span>
          </label>
          <select
            id="marginBottomUnit"
            name="marginBottomUnit"
            onChange={(e) => {
              setMarginBottomUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MARGIN_BOTTOM,
                "unit",
                e.target.value
              );
            }}
            value={marginBottomUnit}
          >
            {props.componentEditableProps.marginBottom.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* margin left */}
      {props.componentEditableProps.marginLeft && (
        <div className="form-input">
          <input
            id="marginLeftValue"
            min="0"
            name="marginLeftValue"
            onChange={(e) => {
              setMarginLeftValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MARGIN_LEFT,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={marginLeftValue}
          />
          <label htmlFor="marginLeftValue">
            <span>{PropsTypes.MARGIN_LEFT}</span>
          </label>
          <select
            id="marginLeftUnit"
            name="marginLeftUnit"
            onChange={(e) => {
              setMarginLeftUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MARGIN_LEFT,
                "unit",
                e.target.value
              );
            }}
            value={marginLeftUnit}
          >
            {props.componentEditableProps.marginLeft.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* margin right */}
      {props.componentEditableProps.marginRight && (
        <div className="form-input">
          <input
            id="marginRightValue"
            min="0"
            name="marginRightValue"
            onChange={(e) => {
              setMarginRightValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MARGIN_RIGHT,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={marginRightValue}
          />
          <label htmlFor="marginRightValue">
            <span>{PropsTypes.MARGIN_RIGHT}</span>
          </label>
          <select
            id="marginRightUnit"
            name="marginRightUnit"
            onChange={(e) => {
              setMarginRightUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MARGIN_RIGHT,
                "unit",
                e.target.value
              );
            }}
            value={marginRightUnit}
          >
            {props.componentEditableProps.marginRight.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* margin top */}
      {props.componentEditableProps.marginTop && (
        <div className="form-input">
          <input
            id="marginTopValue"
            min="0"
            name="marginTopValue"
            onChange={(e) => {
              setMarginTopValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MARGIN_TOP,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={marginTopValue}
          />
          <label htmlFor="marginTopValue">
            <span>{PropsTypes.MARGIN_TOP}</span>
          </label>
          <select
            id="marginTopUnit"
            name="marginTopUnit"
            onChange={(e) => {
              setMarginTopUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MARGIN_TOP,
                "unit",
                e.target.value
              );
            }}
            value={marginTopUnit}
          >
            {props.componentEditableProps.marginTop.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* max width */}
      {props.componentEditableProps.maxWidth && (
        <div className="form-input">
          <input
            id="maxWidthValue"
            min="0"
            name="maxWidthValue"
            onChange={(e) => {
              setMaxWidthValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MAX_WIDTH,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={maxWidthValue}
          />
          <label htmlFor="maxWidthValue">
            <span>{PropsTypes.MAX_WIDTH}</span>
          </label>
          <select
            id="maxWidthUnit"
            name="maxWidthUnit"
            onChange={(e) => {
              setMaxWidthUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MAX_WIDTH,
                "unit",
                e.target.value
              );
            }}
            value={maxWidthUnit}
          >
            {props.componentEditableProps.maxWidth.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* min height */}
      {props.componentEditableProps.minHeight && (
        <div className="form-input">
          <input
            id="minHeightValue"
            min="0"
            name="minHeightValue"
            onChange={(e) => {
              setMinHeightValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MIN_HEIGHT,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={minHeightValue}
          />
          <label htmlFor="minHeightValue">
            <span>{PropsTypes.MIN_HEIGHT}</span>
          </label>
          <select
            id="minHeightUnit"
            name="minHeightUnit"
            onChange={(e) => {
              setMinHeightUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MIN_HEIGHT,
                "unit",
                e.target.value
              );
            }}
            value={minHeightUnit}
          >
            {props.componentEditableProps.minHeight.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* muted */}
      {props.componentEditableProps.muted && (
        <div className="form-input">
          <select
            id="muted"
            name="muted"
            onChange={(e) => {
              setMuted(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.MUTED,
                "",
                e.target.value
              );
            }}
            value={muted}
          >
            {props.componentEditableProps.muted.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit ? "Enable" : "Disable"}
                </option>
              );
            })}
          </select>
          <label htmlFor="muted">
            <span>{PropsTypes.MUTED}</span>
          </label>
        </div>
      )}
      {/* opacity */}
      {props.componentEditableProps.opacity && (
        <div className="form-input">
          <input
            id="opacity"
            max="1"
            min="0"
            name="opacity"
            onChange={(e) => {
              setOpacity(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.OPACITY,
                "",
                e.target.value || 1
              );
            }}
            step="0.1"
            type="number"
            value={opacity}
          />
          <label htmlFor="opacity">
            <span>{PropsTypes.OPACITY}</span>
          </label>
        </div>
      )}
      {/* overflow */}
      {props.componentEditableProps.overflow && (
        <div className="form-input">
          <select
            id="overflow"
            name="overflow"
            onChange={(e) => {
              setOverflow(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.OVERFLOW,
                "",
                e.target.value
              );
            }}
            value={overflow}
          >
            {props.componentEditableProps.overflow.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="overflow">
            <span>{PropsTypes.OVERFLOW}</span>
          </label>
        </div>
      )}
      {/* padding bottom */}
      {props.componentEditableProps.paddingBottom && (
        <div className="form-input">
          <input
            id="paddingBottomValue"
            min="0"
            name="paddingBottomValue"
            onChange={(e) => {
              setPaddingBottomValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.PADDING_BOTTOM,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={paddingBottomValue}
          />
          <label htmlFor="paddingBottomValue">
            <span>{PropsTypes.PADDING_BOTTOM}</span>
          </label>
          <select
            id="paddingBottomUnit"
            name="paddingBottomUnit"
            onChange={(e) => {
              setPaddingBottomUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.PADDING_BOTTOM,
                "unit",
                e.target.value
              );
            }}
            value={paddingBottomUnit}
          >
            {props.componentEditableProps.paddingBottom.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* padding left */}
      {props.componentEditableProps.paddingLeft && (
        <div className="form-input">
          <input
            id="paddingLeftValue"
            min="0"
            name="paddingLeftValue"
            onChange={(e) => {
              setPaddingLeftValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.PADDING_LEFT,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={paddingLeftValue}
          />
          <label htmlFor="paddingLeftValue">
            <span>{PropsTypes.PADDING_LEFT}</span>
          </label>
          <select
            id="paddingLeftUnit"
            name="paddingLeftUnit"
            onChange={(e) => {
              setPaddingLeftUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.PADDING_LEFT,
                "unit",
                e.target.value
              );
            }}
            value={paddingLeftUnit}
          >
            {props.componentEditableProps.paddingLeft.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* padding right */}
      {props.componentEditableProps.paddingRight && (
        <div className="form-input">
          <input
            id="paddingRightValue"
            min="0"
            name="paddingRightValue"
            onChange={(e) => {
              setPaddingRightValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.PADDING_RIGHT,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={paddingRightValue}
          />
          <label htmlFor="paddingRightValue">
            <span>{PropsTypes.PADDING_RIGHT}</span>
          </label>
          <select
            id="paddingRightUnit"
            name="paddingRightUnit"
            onChange={(e) => {
              setPaddingRightUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.PADDING_RIGHT,
                "unit",
                e.target.value
              );
            }}
            value={paddingRightUnit}
          >
            {props.componentEditableProps.paddingRight.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* padding top */}
      {props.componentEditableProps.paddingTop && (
        <div className="form-input">
          <input
            id="paddingTopValue"
            min="0"
            name="paddingTopValue"
            onChange={(e) => {
              setPaddingTopValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.PADDING_TOP,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={paddingTopValue}
          />
          <label htmlFor="paddingTopValue">
            <span>{PropsTypes.PADDING_TOP}</span>
          </label>
          <select
            id="paddingTopUnit"
            name="paddingTopUnit"
            onChange={(e) => {
              setPaddingTopUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.PADDING_TOP,
                "unit",
                e.target.value
              );
            }}
            value={paddingTopUnit}
          >
            {props.componentEditableProps.paddingTop.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* playing */}
      {props.componentEditableProps.playing && (
        <div className="form-input">
          <select
            id="playing"
            name="playing"
            onChange={(e) => {
              setPlaying(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.PLAYING,
                "",
                e.target.value
              );
            }}
            value={playing}
          >
            {props.componentEditableProps.playing.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit ? "Enable" : "Disable"}
                </option>
              );
            })}
          </select>
          <label htmlFor="playing">
            <span>{PropsTypes.PLAYING}</span>
          </label>
        </div>
      )}
      {/* save location */}
      {props.componentEditableProps.saveLocation && (
        <div className="form-input">
          <button
            className="button"
            onClick={() => {
              pageBuilderContext.editComponentProps(
                PropsTypes.LOCATION,
                "",
                null
              );
            }}
          >
            save location
          </button>
        </div>
      )}
      {/* show bullets */}
      {props.componentEditableProps.showBullets && (
        <div className="form-input">
          <select
            id="showBullets"
            name="showBullets"
            onChange={(e) => {
              setShowBullets(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.SHOW_BULLETS,
                "",
                e.target.value
              );
            }}
            value={showBullets}
          >
            {props.componentEditableProps.showBullets.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit ? "Enable" : "Disable"}
                </option>
              );
            })}
          </select>
          <label htmlFor="showBullets">
            <span>{PropsTypes.SHOW_BULLETS}</span>
          </label>
        </div>
      )}
      {/* show fullscreen button */}
      {props.componentEditableProps.showFullscreenButton && (
        <div className="form-input">
          <select
            id="showFullscreenButton"
            name="showFullscreenButton"
            onChange={(e) => {
              setShowFullscreenButton(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.SHOW_FULLSCREEN_BUTTON,
                "",
                e.target.value
              );
            }}
            value={showFullscreenButton}
          >
            {props.componentEditableProps.showFullscreenButton.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit ? "Enable" : "Disable"}
                  </option>
                );
              }
            )}
          </select>
          <label htmlFor="showFullscreenButton">
            <span>{PropsTypes.SHOW_FULLSCREEN_BUTTON}</span>
          </label>
        </div>
      )}
      {/* show nav */}
      {props.componentEditableProps.showNav && (
        <div className="form-input">
          <select
            id="showNav"
            name="showNav"
            onChange={(e) => {
              setShowNav(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.SHOW_NAV,
                "",
                e.target.value
              );
            }}
            value={showNav}
          >
            {props.componentEditableProps.showNav.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit ? "Enable" : "Disable"}
                </option>
              );
            })}
          </select>
          <label htmlFor="showNav">
            <span>{PropsTypes.SHOW_NAV}</span>
          </label>
        </div>
      )}
      {/* show play button */}
      {props.componentEditableProps.showPlayButton && (
        <div className="form-input">
          <select
            id="showPlayButton"
            name="showPlayButton"
            onChange={(e) => {
              setShowPlayButton(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.SHOW_PLAY_BUTTON,
                "",
                e.target.value
              );
            }}
            value={showPlayButton}
          >
            {props.componentEditableProps.showPlayButton.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit ? "Enable" : "Disable"}
                </option>
              );
            })}
          </select>
          <label htmlFor="showPlayButton">
            <span>{PropsTypes.SHOW_PLAY_BUTTON}</span>
          </label>
        </div>
      )}
      {/* show thumbnails */}
      {props.componentEditableProps.showThumbnails && (
        <div className="form-input">
          <select
            id="showThumbnails"
            name="showThumbnails"
            onChange={(e) => {
              setShowThumbnails(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.SHOW_THUMBNAILS,
                "",
                e.target.value
              );
            }}
            value={showThumbnails}
          >
            {props.componentEditableProps.showThumbnails.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit ? "Enable" : "Disable"}
                </option>
              );
            })}
          </select>
          <label htmlFor="showThumbnails">
            <span>{PropsTypes.SHOW_THUMBNAILS}</span>
          </label>
        </div>
      )}
      {/* slide interval */}
      {props.componentEditableProps.slideInterval && (
        <div className="form-input">
          <input
            id="slideInterval"
            min="0"
            name="slideInterval"
            onChange={(e) => {
              setSlideInterval(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.SLIDE_INTERVAL,
                "",
                e.target.value || 0
              );
            }}
            step="500"
            type="number"
            value={slideInterval}
          />
          <label htmlFor="slideInterval">
            <span>{PropsTypes.SLIDE_INTERVAL} (ms)</span>
          </label>
        </div>
      )}
      {/* source */}
      {props.componentEditableProps.source && (
        <div className="form-input">
          <input
            id="source"
            name="source"
            onChange={(e) => {
              setSource(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.SOURCE,
                "value",
                e.target.value || ""
              );
            }}
            type="text"
            value={source}
          />
          <label htmlFor="source">
            <span>{PropsTypes.SOURCE}</span>
          </label>
        </div>
      )}
      {/* star rating cap */}
      {props.componentEditableProps.starRatingCap && (
        <div className="form-input">
          <input
            id="starRatingCap"
            max="10"
            min={Math.round(starRatingValue)}
            name="starRatingCap"
            onChange={(e) => {
              setStarRatingCap(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.STAR_RATING_CAP,
                "",
                e.target.value || "0"
              );
            }}
            type="number"
            value={starRatingCap}
          />
          <label htmlFor="starRatingCap">
            <span>{PropsTypes.STAR_RATING_CAP}</span>
          </label>
        </div>
      )}
      {/* star rating value */}
      {props.componentEditableProps.starRatingValue && (
        <div className="form-input">
          <input
            id="starRatingValue"
            max={starRatingCap}
            min="0"
            name="starRatingValue"
            onChange={(e) => {
              setStarRatingValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.STAR_RATING_VALUE,
                "",
                e.target.value || "0"
              );
            }}
            step="0.5"
            type="number"
            value={starRatingValue}
          />
          <label htmlFor="starRatingValue">
            <span>{PropsTypes.STAR_RATING_VALUE}</span>
          </label>
        </div>
      )}
      {/* text */}
      {props.componentEditableProps.text && (
        <div className="form-input">
          <input
            id="text"
            name="text"
            onChange={(e) => {
              setText(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.TEXT,
                "",
                e.target.value || "Type Something"
              );
            }}
            type="text"
            value={text}
          />
          <label htmlFor="text">
            <span>{PropsTypes.TEXT}</span>
          </label>
        </div>
      )}
      {/* text align */}
      {props.componentEditableProps.textAlign && (
        <div className="form-input">
          <select
            id="textAlign"
            name="textAlign"
            onChange={(e) => {
              setTextAlign(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.TEXT_ALIGN,
                "",
                e.target.value
              );
            }}
            value={textAlign}
          >
            {props.componentEditableProps.textAlign.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="textAlign">
            <span>{PropsTypes.TEXT_ALIGN}</span>
          </label>
        </div>
      )}
      {/* text decoration */}
      {props.componentEditableProps.textDecoration && (
        <div className="form-input">
          <select
            id="textDecoration"
            name="textDecoration"
            onChange={(e) => {
              setTextDecoration(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.TEXT_DECORATION,
                "",
                e.target.value
              );
            }}
            value={textDecoration}
          >
            {props.componentEditableProps.textDecoration.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="textDecoration">
            <span>{PropsTypes.TEXT_DECORATION}</span>
          </label>
        </div>
      )}
      {/* text editor value */}
      {props.componentEditableProps.textEditorValue && (
        <Editor
          editorState={textEditorValue}
          toolbarClassName="edit-component-text-editor-toolbar"
          wrapperClassName="edit-component-text-editor-wrapper"
          editorClassName="edit-component-text-editor"
          onEditorStateChange={(e) => {
            setTextEditorValue(e);
            pageBuilderContext.editComponentProps(
              PropsTypes.TEXT_EDITOR_VALUE,
              "",
              convertToRaw(e.getCurrentContent())
            );
          }}
        />
      )}
      {/* text transform */}
      {props.componentEditableProps.textTransform && (
        <div className="form-input">
          <select
            id="textTransform"
            name="textTransform"
            onChange={(e) => {
              setTextTransform(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.TEXT_TRANSFORM,
                "",
                e.target.value
              );
            }}
            value={textTransform}
          >
            {props.componentEditableProps.textTransform.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
          <label htmlFor="textTransform">
            <span>{PropsTypes.TEXT_TRANSFORM}</span>
          </label>
        </div>
      )}
      {/* thumbnail position */}
      {props.componentEditableProps.thumbnailPosition && (
        <div className="form-input">
          <select
            id="thumbnailPosition"
            name="thumbnailPosition"
            onChange={(e) => {
              setThumbnailPosition(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.THUMBNAIL_POSITION,
                "",
                e.target.value
              );
            }}
            value={thumbnailPosition}
          >
            {props.componentEditableProps.thumbnailPosition.map(
              (unit, index) => {
                return (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                );
              }
            )}
          </select>
          <label htmlFor="thumbnailPosition">
            <span>{PropsTypes.THUMBNAIL_POSITION}</span>
          </label>
        </div>
      )}
      {/* width */}
      {props.componentEditableProps.width && (
        <div className="form-input">
          <input
            id="widthValue"
            min="0"
            name="widthValue"
            onChange={(e) => {
              setWidthValue(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.WIDTH,
                "value",
                e.target.value || 0
              );
            }}
            type="number"
            value={widthValue}
          />
          <label htmlFor="widthValue">
            <span>{PropsTypes.WIDTH}</span>
          </label>
          <select
            id="widthUnit"
            name="widthUnit"
            onChange={(e) => {
              setWidthUnit(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.WIDTH,
                "unit",
                e.target.value
              );
            }}
            value={widthUnit}
          >
            {props.componentEditableProps.width.map((unit, index) => {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {/* z index */}
      {props.componentEditableProps.zIndex && (
        <div className="form-input">
          <input
            id="zIndex"
            min="0"
            name="zIndex"
            onChange={(e) => {
              setZIndex(e.target.value);
              pageBuilderContext.editComponentProps(
                PropsTypes.ZINDEX,
                "",
                e.target.value || "auto"
              );
            }}
            placeholder="auto"
            type="number"
            value={zIndex === "auto" ? "" : zIndex}
          />
          <label htmlFor="zIndex">
            <span>{PropsTypes.ZINDEX}</span>
          </label>
        </div>
      )}
    </section>
  );
};

export default EditComponent;
