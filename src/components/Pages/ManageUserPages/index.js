import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

//components
import ButtonRipple from "../../ButtonRipple";
import MessageModal from "../../MessageModal";

//css
import "./manageuserpages.css";

const modalReducer = (modalState, action) => {
  if (action.type === "SHOW_MODAL") {
    return {
      ...modalState,
      isShowMessageModal: true,
      messageModalContent: action.payload,
      messageModalStatusCode: action.statusCode,
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      ...modalState,
      isShowMessageModal: false,
    };
  }

  throw new Error("no matching action type");
};

const ManageUserPages = () => {
  const appContext = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { ref } = register("pageName");
  const pageNameRef = useRef(null);
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    isShowMessageModal: false,
    messageModalContent: "hello world",
    messageModalStatusCode: 200,
  });
  const { siteID } = useParams();
  const [sitePages, setSitePages] = useState([]);

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  const deleteUserSitePage = (site_page_id) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      sitePageID: site_page_id,
      sitePageSiteID: siteID,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/deleteusersitepage`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (res.data.status === 200) {
          fetchUserSitePages();
        }

        modalDispatch({
          type: "SHOW_MODAL",
          payload: res.data.message,
          statusCode: res.data.status,
        });
      })
      .catch((err) => {
        //error
        if (err.response) {
          console.log("res error", err.response.data);
        } else if (err.request) {
          console.log("req error", err.request.data);
        } else {
          console.log("Error", err.message);
        }
        appContext.setIsLoading(false);
      });
  };

  const fetchUserSitePages = () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      siteID: siteID,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/getusersitepages`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (res.data.status === 200) {
          setSitePages(res.data.result);
        }
      })
      .catch((err) => {
        //error
        if (err.response) {
          console.log("res error", err.response.data);
        } else if (err.request) {
          console.log("req error", err.request.data);
        } else {
          console.log("Error", err.message);
        }
        appContext.setIsLoading(false);
      });
  };

  const onSubmit = (data) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      pageName: data.pageName,
      siteID: siteID,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/addusersitepage`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (res.data.status === 200) {
          fetchUserSitePages();
        }

        modalDispatch({
          type: "SHOW_MODAL",
          payload: res.data.message,
          statusCode: res.data.status,
        });
      })
      .catch((err) => {
        //error
        if (err.response) {
          console.log("res error", err.response.data);
        } else if (err.request) {
          console.log("req error", err.request.data);
        } else {
          console.log("Error", err.message);
        }
        appContext.setIsLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Manage Pages";
    fetchUserSitePages();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="navbar-margin">
      <section className="manage-user-pages">
        <h1>enter page name</h1>
        {modalState.isShowMessageModal && (
          <MessageModal
            closeModal={closeModal}
            content={modalState.messageModalContent}
            statusCode={modalState.messageModalStatusCode}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            <input
              id="pageName"
              className={errors.pageName && "form-input-error"}
              {...register("pageName", {
                required: "this field is required",
                pattern: {
                  value:
                    // eslint-disable-next-line
                    /^([A-Za-z]|[0-9]|_)+$/,
                  message: "invalid format",
                },
              })}
              ref={(e) => {
                ref(e);
                pageNameRef.current = e; // you can still assign to ref
              }}
            />
            <label htmlFor="pageName">
              <span></span>
            </label>
            {errors.pageName && (
              <span className="error-message">
                <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;
                {errors.pageName.message}
              </span>
            )}
          </div>
          <ButtonRipple
            fa={<FontAwesomeIcon icon={faPlus} />}
            iconIsLeft={true}
            text="add"
          />
        </form>
        <div className="page-list">
          <h2>page list</h2>
          {sitePages.length > 0
            ? sitePages.map((page) => {
                const { site_page_id, site_page_name } = page;
                return (
                  <div className="page-list-container" key={site_page_id}>
                    <span>{site_page_name}</span>
                    <ButtonRipple
                      fa={<FontAwesomeIcon icon={faTrash} />}
                      onClick={() => deleteUserSitePage(site_page_id)}
                    />
                  </div>
                );
              })
            : "no pages"}
        </div>
      </section>
    </div>
  );
};

export default ManageUserPages;
