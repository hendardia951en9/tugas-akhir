export const checkLinkTo = (linkTo) => {
  if (linkTo === "home" || linkTo === "about" || linkTo === "contact") {
    return true;
  } else {
    return false;
  }
};
