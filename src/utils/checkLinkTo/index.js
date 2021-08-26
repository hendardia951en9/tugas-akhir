export const checkLinkTo = (linkTo) => {
  if (linkTo.includes("http")) {
    return false;
  } else {
    return true;
  }
};
