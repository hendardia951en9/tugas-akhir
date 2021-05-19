export const generateStyle = (style) => {
  let result = {};

  for (const index in style) {
    if (Object.hasOwnProperty.call(style, index)) {
      const element = style[index];

      if (element.length) {
        result = { ...result, [index]: element };
      } else {
        if (index === "backgroundColor") {
          result = {
            ...result,
            backgroundColor: `rgba(${style[index].r}, ${style[index].g}, ${style[index].b}, ${style[index].a})`,
          };
        } else if (index === "color") {
          result = {
            ...result,
            color: `rgba(${style[index].r}, ${style[index].g}, ${style[index].b}, ${style[index].a})`,
          };
        } else if (index === "boxShadowProps") {
          let boxShadow = "";

          boxShadow +=
            " " + style[index].boxShadowX.value + style[index].boxShadowX.unit;
          boxShadow +=
            " " + style[index].boxShadowY.value + style[index].boxShadowY.unit;
          boxShadow +=
            " " +
            style[index].boxShadowBlur.value +
            style[index].boxShadowBlur.unit;
          boxShadow +=
            " " +
            style[index].boxShadowSpread.value +
            style[index].boxShadowSpread.unit;
          boxShadow += " " + style[index].boxShadowColor;
          boxShadow += " " + style[index].boxShadowInset;

          result = { ...result, boxShadow: boxShadow };
        } else {
          if (element.unit === "auto" || element.unit === "normal") {
            result = { ...result, [index]: element.unit };
          } else {
            result = { ...result, [index]: element.value + element.unit };
          }
        }
      }
    }
  }

  return result;
};
