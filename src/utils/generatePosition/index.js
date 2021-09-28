export const generatePosition = (style) => {
  let result = {
    position: "absolute",
    top: "auto",
    left: "auto",
    bottom: "auto",
    right: "auto",
    zIndex: style.zIndex,
  };

  if (style.top.unit !== "auto") {
    result.top = style.top.value + style.top.unit;
  }
  if (style.left.unit !== "auto") {
    result.left = style.left.value + style.left.unit;
  }
  if (style.bottom.unit !== "auto") {
    result.bottom = style.bottom.value + style.bottom.unit;
  }
  if (style.right.unit !== "auto") {
    result.right = style.right.value + style.right.unit;
  }

  return result;
};
