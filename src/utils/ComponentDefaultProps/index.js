import { ItemTypes } from "../ItemTypes";

export const ComponentDefaultProps = {
  BUTTON: {
    buttonAlignment: "left",
    linkTo: "",
    style: {
      backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
      borderBottomLeftRadius: { value: "0", unit: "px" },
      borderBottomRightRadius: { value: "0", unit: "px" },
      borderBottomWidth: { value: "2", unit: "px" },
      borderColor: { r: 0, g: 0, b: 0, a: 1 },
      borderLeftWidth: { value: "2", unit: "px" },
      borderRightWidth: { value: "2", unit: "px" },
      borderStyle: "solid",
      borderTopLeftRadius: { value: "0", unit: "px" },
      borderTopRightRadius: { value: "0", unit: "px" },
      borderTopWidth: { value: "2", unit: "px" },
      color: { r: 0, g: 0, b: 0, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
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
      textAlign: "left",
      textDecoration: "none",
      textTransform: "none",
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
    },
    dividerTextContainerStyle: {
      alignItems: "center",
      color: { r: 0, g: 0, b: 0, a: 1 },
      fontSize: { value: "16", unit: "px" },
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
      textAlign: "left",
      textDecoration: "none",
      textTransform: "capitalize",
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
      justifyContent: "flex-start",
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      width: { value: "100", unit: "%" },
      zIndex: "auto",
    },
    text: "this is icon",
  },
  IMAGE: {
    imageAlignment: "left",
    linkTo: "",
    style: {
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
      opacity: "1",
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
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
      backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
      backgroundImage: "url('')",
      gap: { value: "16", unit: "px" },
      height: { value: "0", unit: "auto" },
      justifyContent: "space-evenly",
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      maxWidth: { value: "0", unit: "auto" },
      minHeight: { value: "300", unit: "px" },
      overflow: "visible",
      paddingBottom: { value: "16", unit: "px" },
      paddingLeft: { value: "16", unit: "px" },
      paddingRight: { value: "16", unit: "px" },
      paddingTop: { value: "16", unit: "px" },
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    text: "this is inner section",
  },
  INNERSECTION_LAYOUT: {
    children: [],
    style: {
      alignItems: "center",
      backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
      gap: { value: "16", unit: "px" },
      height: { value: "0", unit: "auto" },
      justifyContent: "center",
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      overflow: "visible",
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
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
      color: { r: 0, g: 0, b: 0, a: 1 },
      fontSize: { value: "16", unit: "px" },
      gap: { value: "0", unit: "px" },
      justifyContent: "flex-start",
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      overflow: "visible",
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      width: { value: "0", unit: "auto" },
      zIndex: "auto",
    },
    text: "this is star rating",
  },
  TEXT_EDITOR: {
    style: {
      backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
      marginBottom: { value: "0", unit: "px" },
      marginLeft: { value: "0", unit: "px" },
      marginRight: { value: "0", unit: "px" },
      marginTop: { value: "0", unit: "px" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      zIndex: "auto",
    },
    text: "this is text editor",
    textEditorValue: null,
  },
  USER_FOOTER_BLOG: {
    menu: [
      {
        itemTypes: ItemTypes.USER_FOOTER_MENU,
        props: {
          style: {
            flexDirection: "column",
          },
          text: "contact",
        },
        submenu: [
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "ngagel",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "08123456789",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "test@gmail.com",
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
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "fb",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "ig",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "tw",
            },
          },
        ],
      },
    ],
    style: {
      alignItems: "flex-start",
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "bold",
      gap: { value: "16", unit: "px" },
      justifyContent: "space-evenly",
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      textTransform: "uppercase",
    },
    subMenuStyle: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      gap: { value: "16", unit: "px" },
      textTransform: "capitalize",
    },
    type: ItemTypes.USER_FOOTER_TYPE_1,
    userFooterLogo: "https://ipac.page/images/brand-logo-1.jpg",
    userFooterLogoMaxHeight: { value: "70", unit: "px" },
    userFooterLogoMaxWidth: { value: "140", unit: "px" },
    userFooterLogoIsShow: true,
    userFooterWatermarkIsShow: true,
    watermarkStyle: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      textTransform: "capitalize",
    },
    userFooterWatermarkText: "watermark",
  },
  USER_NAVBAR_BLOG: {
    menu: [
      {
        itemTypes: ItemTypes.USER_NAVBAR_MENU,
        props: {
          linkTo: "home",
          text: "home",
        },
        submenu: [],
      },
      {
        itemTypes: ItemTypes.USER_NAVBAR_MENU,
        props: {
          linkTo: "about",
          text: "about",
        },
        submenu: [],
      },
    ],
    style: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "bold",
      gap: { value: "16", unit: "px" },
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      textTransform: "uppercase",
    },
    subMenuStyle: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      gap: { value: "16", unit: "px" },
      textTransform: "capitalize",
    },
    userNavbarLogo: "https://ipac.page/images/brand-logo-1.jpg",
    userNavbarLogoMaxHeight: { value: "40", unit: "px" },
    userNavbarLogoMaxWidth: { value: "80", unit: "px" },
    userNavbarLogoIsShow: true,
  },
  USER_FOOTER_COMPANY_PROFILE: {
    menu: [
      {
        itemTypes: ItemTypes.USER_FOOTER_MENU,
        props: {
          style: {
            flexDirection: "column",
          },
          text: "contact",
        },
        submenu: [
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "ngagel",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "08123456789",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "test@gmail.com",
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
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "fb",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "ig",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "tw",
            },
          },
        ],
      },
    ],
    style: {
      alignItems: "flex-start",
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "bold",
      gap: { value: "16", unit: "px" },
      justifyContent: "space-evenly",
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      textTransform: "uppercase",
    },
    subMenuStyle: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      gap: { value: "16", unit: "px" },
      textTransform: "capitalize",
    },
    type: ItemTypes.USER_FOOTER_TYPE_1,
    userFooterLogo: "https://ipac.page/images/brand-logo-1.jpg",
    userFooterLogoMaxHeight: { value: "70", unit: "px" },
    userFooterLogoMaxWidth: { value: "140", unit: "px" },
    userFooterLogoIsShow: true,
    userFooterWatermarkIsShow: true,
    watermarkStyle: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      textTransform: "capitalize",
    },
    userFooterWatermarkText: "watermark",
  },
  USER_NAVBAR_COMPANY_PROFILE: {
    logo: "https://ipac.page/images/brand-logo-1.jpg",
    menuStyle: {
      color: { r: 255, g: 255, b: 255, a: 1 },
    },
    style: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
    },
    subMenuStyle: {
      color: { r: 255, g: 255, b: 255, a: 1 },
    },
    menu: [
      {
        submenu: null,
        text: "home",
      },
      {
        submenu: null,
        text: "about",
      },
      {
        submenu: null,
        text: "contact us",
      },
    ],
  },
  USER_FOOTER_LANDING_PAGES: {
    menu: [
      {
        itemTypes: ItemTypes.USER_FOOTER_MENU,
        props: {
          style: {
            flexDirection: "column",
          },
          text: "contact",
        },
        submenu: [
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "ngagel",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "08123456789",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "test@gmail.com",
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
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "fb",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "ig",
            },
          },
          {
            itemTypes: ItemTypes.USER_FOOTER_SUBMENU,
            props: {
              icon: "FaReact",
              userFooterSubMenuIsShowIcon: true,
              linkTo: "",
              text: "tw",
            },
          },
        ],
      },
    ],
    style: {
      alignItems: "flex-start",
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "bold",
      gap: { value: "16", unit: "px" },
      justifyContent: "space-evenly",
      paddingBottom: { value: "0", unit: "px" },
      paddingLeft: { value: "0", unit: "px" },
      paddingRight: { value: "0", unit: "px" },
      paddingTop: { value: "0", unit: "px" },
      textTransform: "uppercase",
    },
    subMenuStyle: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      gap: { value: "16", unit: "px" },
      textTransform: "capitalize",
    },
    type: ItemTypes.USER_FOOTER_TYPE_1,
    userFooterLogo: "https://ipac.page/images/brand-logo-1.jpg",
    userFooterLogoMaxHeight: { value: "70", unit: "px" },
    userFooterLogoMaxWidth: { value: "140", unit: "px" },
    userFooterLogoIsShow: true,
    userFooterWatermarkIsShow: true,
    watermarkStyle: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
      color: { r: 255, g: 255, b: 255, a: 1 },
      fontSize: { value: "16", unit: "px" },
      fontWeight: "normal",
      textTransform: "capitalize",
    },
    userFooterWatermarkText: "watermark",
  },
  USER_NAVBAR_LANDING_PAGES: {
    logo: "https://ipac.page/images/brand-logo-1.jpg",
    menuStyle: {
      color: { r: 255, g: 255, b: 255, a: 1 },
    },
    style: {
      backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
    },
    subMenuStyle: {
      color: { r: 255, g: 255, b: 255, a: 1 },
    },
    menu: [
      {
        submenu: null,
        text: "home",
      },
    ],
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
