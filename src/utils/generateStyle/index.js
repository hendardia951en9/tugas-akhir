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
            backgroundColor: `rgba(${element.r}, ${element.g}, ${element.b}, ${element.a})`,
          };
        } else if (index === "borderColor") {
          result = {
            ...result,
            borderColor: `rgba(${element.r}, ${element.g}, ${element.b}, ${element.a})`,
          };
        } else if (index === "borderProps") {
          let border = "";

          border +=
            element.borderWeight.value +
            element.borderWeight.unit +
            " " +
            element.borderStyle +
            " " +
            `rgba(${element.borderColor.r}, ${element.borderColor.g}, ${element.borderColor.b}, ${element.borderColor.a})`;

          result = {
            ...result,
            border: border,
          };
        } else if (index === "color") {
          result = {
            ...result,
            color: `rgba(${element.r}, ${element.g}, ${element.b}, ${element.a})`,
          };
        } else if (index === "boxShadowProps") {
          let boxShadow = "";

          boxShadow += " " + element.boxShadowX.value + element.boxShadowX.unit;
          boxShadow += " " + element.boxShadowY.value + element.boxShadowY.unit;
          boxShadow +=
            " " + element.boxShadowBlur.value + element.boxShadowBlur.unit;
          boxShadow +=
            " " + element.boxShadowSpread.value + element.boxShadowSpread.unit;
          boxShadow +=
            " " +
            `rgba(${element.boxShadowColor.r}, ${element.boxShadowColor.g}, ${element.boxShadowColor.b}, ${element.boxShadowColor.a})`;
          boxShadow += " " + element.boxShadowInset;

          result = { ...result, boxShadow: boxShadow };
        } else {
          if (
            element.unit === "auto" ||
            element.unit === "fit-content" ||
            element.unit === "normal"
          ) {
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
