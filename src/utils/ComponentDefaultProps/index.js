import { ItemTypes } from "../ItemTypes";

export const ComponentDefaultProps = {
  BUTTON: {
    buttonAlignment: "left",
    linkTo: "",
    style: {
      backgroundColor: { r: 0, g: 0, b: 205, a: 1 },
      borderBottomLeftRadius: { value: "200", unit: "px" },
      borderBottomRightRadius: { value: "200", unit: "px" },
      borderBottomWidth: { value: "0", unit: "px" },
      borderColor: { r: 0, g: 0, b: 0, a: 1 },
      borderLeftWidth: { value: "0", unit: "px" },
      borderRightWidth: { value: "0", unit: "px" },
      borderStyle: "solid",
      borderTopLeftRadius: { value: "200", unit: "px" },
      borderTopRightRadius: { value: "200", unit: "px" },
      borderTopWidth: { value: "0", unit: "px" },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontFamily: "inherit",
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      height: { value: "0", unit: "auto" },
      letterSpacing: { value: "0", unit: "normal" },
      lineHeight: { value: "0", unit: "normal" },
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      paddingBottom: { value: "0.5", unit: "em" },
      paddingLeft: { value: "0.8", unit: "em" },
      paddingRight: { value: "0.8", unit: "em" },
      paddingTop: { value: "0.5", unit: "em" },
      position: "relative",
      top: { value: "0", unit: "auto" },
      left: { value: "0", unit: "auto" },
      bottom: { value: "0", unit: "auto" },
      right: { value: "0", unit: "auto" },
      textAlign: "left",
      textDecoration: "none",
      textTransform: "capitalize",
      zIndex: "auto",
      width: { value: "0", unit: "auto" },
    },
    text: "this is button",
  },
  DIVIDER: {
    dividerText: "",
    dividerStyle: {
      borderProps: {
        borderColor: { r: 0, g: 0, b: 0, a: 1 },
        borderStyle: "solid",
        borderWeight: { value: "2", unit: "px" },
      },
      marginBottom: { value: "0.5", unit: "em" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0.5", unit: "em" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    dividerTextContainerStyle: {
      alignItems: "center",
      color: { r: 0, g: 0, b: 0, a: 1 },
      fontFamily: "inherit",
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      justifyContent: "center",
    },
    dividerTextStyle: {
      backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
    },
    text: "this is divider",
  },
  HEADING: {
    style: {
      backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
      color: { r: 0, g: 0, b: 0, a: 1 },
      fontFamily: "inherit",
      fontSize: { value: "32", unit: "px" },
      fontWeight: "bold",
      letterSpacing: { value: "0", unit: "normal" },
      lineHeight: { value: "0", unit: "normal" },
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      position: "relative",
      top: { value: "0", unit: "auto" },
      left: { value: "0", unit: "auto" },
      bottom: { value: "0", unit: "auto" },
      right: { value: "0", unit: "auto" },
      textAlign: "left",
      textDecoration: "none",
      textTransform: "capitalize",
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    text: "this is heading",
  },
  ICON: {
    icon: "FaReact",
    linkTo: "",
    style: {
      backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
      color: { r: 0, g: 0, b: 0, a: 1 },
      fontSize: { value: "32", unit: "px" },
      height: { value: "0", unit: "auto" },
      justifyContent: "flex-start",
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      position: "relative",
      top: { value: "0", unit: "auto" },
      left: { value: "0", unit: "auto" },
      bottom: { value: "0", unit: "auto" },
      right: { value: "0", unit: "auto" },
      width: { value: "100", unit: "%" },
      zIndex: "auto",
    },
    text: "this is icon",
  },
  IMAGE: {
    imageAlignment: "left",
    linkTo: "",
    style: {
      backgroundAttachment: "scroll",
      backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
      backgroundImage:
        "url('https://alppetro.co.id/dist/assets/images/default.jpg')",
      backgroundPosition: "left top",
      backgroundRepeat: "repeat",
      backgroundSize: "auto",
      borderBottomLeftRadius: { value: "0", unit: "px" },
      borderBottomRightRadius: { value: "0", unit: "px" },
      borderBottomWidth: { value: "0", unit: "px" },
      borderColor: { r: 0, g: 0, b: 0, a: 1 },
      borderLeftWidth: { value: "0", unit: "px" },
      borderRightWidth: { value: "0", unit: "px" },
      borderStyle: "solid",
      borderTopLeftRadius: { value: "0", unit: "px" },
      borderTopRightRadius: { value: "0", unit: "px" },
      borderTopWidth: { value: "0", unit: "px" },
      boxShadowProps: {
        boxShadowBlur: { value: "0", unit: "px" },
        boxShadowColor: { r: 0, g: 0, b: 0, a: 1 },
        boxShadowInset: "",
        boxShadowSpread: { value: "0", unit: "px" },
        boxShadowX: { value: "0", unit: "px" },
        boxShadowY: { value: "0", unit: "px" },
      },
      height: { value: "0", unit: "auto" },
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      maxHeight: { value: "0", unit: "auto" },
      maxWidth: { value: "0", unit: "auto" },
      minHeight: { value: "0", unit: "auto" },
      minWidth: { value: "0", unit: "auto" },
      opacity: "1",
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      position: "relative",
      top: { value: "0", unit: "auto" },
      left: { value: "0", unit: "auto" },
      bottom: { value: "0", unit: "auto" },
      right: { value: "0", unit: "auto" },
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    text: "this is image",
  },
  IMAGE_GALLERY: {
    imageGalleryAlignment: "left",
    imageGalleryImages: [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
      },
    ],
    infinite: "true",
    showBullets: "true",
    showFullscreenButton: "true",
    showNav: "true",
    showPlayButton: "true",
    showThumbnails: "true",
    slideInterval: "3000",
    style: {
      width: { value: "0", unit: "auto" },
    },
    text: "this is image",
    thumbnailPosition: "bottom",
  },
  INNERSECTION: {
    style: {
      alignItems: "stretch",
      backgroundAttachment: "scroll",
      backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
      backgroundImage: "url('')",
      backgroundPosition: "left top",
      backgroundRepeat: "repeat",
      backgroundSize: "auto",
      gap: { value: "16", unit: "px" },
      height: { value: "0", unit: "auto" },
      justifyContent: "space-evenly",
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      maxHeight: { value: "0", unit: "auto" },
      maxWidth: { value: "0", unit: "auto" },
      minHeight: { value: "500", unit: "px" },
      minWidth: { value: "0", unit: "auto" },
      overflow: "hidden",
      paddingBottom: { value: "16", unit: "px" },
      paddingLeft: { value: "16", unit: "px" },
      paddingRight: { value: "16", unit: "px" },
      paddingTop: { value: "16", unit: "px" },
      position: "relative",
      top: { value: "0", unit: "auto" },
      left: { value: "0", unit: "auto" },
      bottom: { value: "0", unit: "auto" },
      right: { value: "0", unit: "auto" },
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    text: "this is inner section",
  },
  INNERSECTION_LAYOUT: {
    children: [],
    style: {
      alignItems: "center",
      backgroundAttachment: "scroll",
      backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
      backgroundImage: "url('')",
      backgroundPosition: "left top",
      backgroundRepeat: "repeat",
      backgroundSize: "auto",
      gap: { value: "16", unit: "px" },
      height: { value: "0", unit: "auto" },
      justifyContent: "center",
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      maxHeight: { value: "0", unit: "auto" },
      maxWidth: { value: "0", unit: "auto" },
      minHeight: { value: "0", unit: "auto" },
      minWidth: { value: "0", unit: "auto" },
      overflow: "hidden",
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    text: "this is inner section layout",
  },
  MAP_COMPONENT: {
    location: {
      latitude: 37.7577,
      longitude: -122.4376,
    },
    style: {
      height: { value: "300", unit: "px" },
      width: { value: "100", unit: "%" },
    },
    text: "this is map",
    zoom: 8,
  },
  SPACER: {
    style: {
      height: { value: "100", unit: "px" },
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
    },
    text: "this is spacer",
  },
  STAR_RATING: {
    starRatingCap: "5",
    starRatingValue: "2.5",
    style: {
      backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
      color: { r: 0, g: 0, b: 0, a: 1 },
      fontSize: { value: "16", unit: "px" },
      gap: { value: "0", unit: "px" },
      height: { value: "0", unit: "auto" },
      justifyContent: "flex-start",
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      overflow: "hidden",
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      position: "relative",
      top: { value: "0", unit: "auto" },
      left: { value: "0", unit: "auto" },
      bottom: { value: "0", unit: "auto" },
      right: { value: "0", unit: "auto" },
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    text: "this is star rating",
  },
  TEXT_EDITOR: {
    style: {
      backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
      color: { r: 0, g: 0, b: 0, a: 1 },
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      position: "relative",
      top: { value: "0", unit: "auto" },
      left: { value: "0", unit: "auto" },
      bottom: { value: "0", unit: "auto" },
      right: { value: "0", unit: "auto" },
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    text: "this is text editor",
    textEditorValue: null,
  },
  USER_FOOTER: {
    menu: [
      {
        itemTypes: ItemTypes.USER_FOOTER_MENU,
        props: {
          style: {
            flexDirection: "column",
          },
          text: "product",
        },
        submenu: [
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: false,
              linkTo: "",
              text: "create websites",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: false,
              linkTo: "",
              text: "secure cloud meeting",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: false,
              linkTo: "",
              text: "engage your audience",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: false,
              linkTo: "",
              text: "website support",
            },
          },
        ],
      },
      {
        itemTypes: ItemTypes.USER_FOOTER_MENU,
        props: {
          style: {
            flexDirection: "row",
          },
          text: "follow us",
        },
        submenu: [
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaFacebookF",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaInstagram",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaLinkedinIn",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaTwitter",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "",
            },
          },
        ],
      },
    ],
    style: {
      alignItems: "flex-start",
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontFamily: "inherit",
      fontSize: { value: "16", unit: "px" },
      fontWeight: "bold",
      gap: { value: "32", unit: "px" },
      justifyContent: "space-evenly",
      paddingBottom: { value: "16", unit: "px" },
      paddingLeft: { value: "16", unit: "px" },
      paddingRight: { value: "16", unit: "px" },
      paddingTop: { value: "16", unit: "px" },
      textTransform: "uppercase",
    },
    subMenuStyle: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontFamily: "inherit",
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      gap: { value: "16", unit: "px" },
      textTransform: "capitalize",
    },
    userFooterLogo: `${process.env.REACT_APP_BASE_API_URL}/public/admin/images/logo.png`,
    userFooterLogoMaxHeight: { value: "70", unit: "px" },
    userFooterLogoMaxWidth: { value: "140", unit: "px" },
    userFooterLogoIsShow: true,
    userFooterWatermarkIsShow: true,
    watermarkStyle: {
      backgroundColor: { r: 32, g: 34, b: 40, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontFamily: "inherit",
      fontSize: { value: "1", unit: "em" },
      fontWeight: "normal",
      textTransform: "capitalize",
    },
    userFooterWatermarkText: "© 2021 Copyright Rift.com",
  },
  USER_NAVBAR: {
    menu: [],
    style: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontFamily: "inherit",
      fontSize: { value: "16", unit: "px" },
      fontWeight: "bold",
      gap: { value: "16", unit: "px" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "16", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      textTransform: "uppercase",
    },
    subMenuStyle: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontFamily: "inherit",
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      gap: { value: "16", unit: "px" },
      textTransform: "capitalize",
    },
    userNavbarLogo: `${process.env.REACT_APP_BASE_API_URL}/public/admin/images/logo.png`,
    userNavbarLogoMaxHeight: { value: "40", unit: "px" },
    userNavbarLogoMaxWidth: { value: "80", unit: "px" },
    userNavbarLogoIsShow: true,
  },
  VIDEO: {
    controls: "true",
    loop: "false",
    muted: "false",
    playing: "false",
    source: "https://www.youtube.com/watch?v=E4K0XbLtwHc",
    style: {
      height: { value: "0", unit: "auto" },
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    text: "this is video",
  },
};
