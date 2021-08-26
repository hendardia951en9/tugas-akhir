import React, {
  useContext,
  useEffect,
  useState,
  useReducer,
  useRef,
} from "react";
import $ from "jquery";
import { AppContext } from "../../../App";
import axios from "axios";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useForm } from "react-hook-form";

//components
import ButtonRipple from "../../ButtonRipple";
import MessageModal from "../../MessageModal";

//css
import "./createcategory.css";

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

const CreateCategory = () => {
  const appContext = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { ref } = register("categoryNameForm");
  const categoryNameFormRef = useRef(null);
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    isShowMessageModal: false,
    messageModalContent: "hello world",
    messageModalStatusCode: 200,
  });
  const [categoryPages, setCategoryPages] = useState([]);

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  const createCategory = async (categoryName) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      categoryName: categoryName,
      categoryPages: JSON.stringify(categoryPages),
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/checkcategoryname`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        if (res.data.status === 200) {
          axios
            .post(
              `${process.env.REACT_APP_SITE_API_URL}/createcategory`,
              formData,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {
              //success
              appContext.setIsLoading(false);
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
        } else {
          appContext.setIsLoading(false);
          modalDispatch({
            type: "SHOW_MODAL",
            payload: res.data.message,
            statusCode: res.data.status,
          });
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

  const handleClickAddCategoryPage = () => {
    setCategoryPages([
      ...categoryPages,
      {
        pageName: "lorem",
      },
    ]);
  };

  const handleClickDeleteCategoryPage = (index) => {
    const temp = [...categoryPages];
    temp.splice(index, 1);
    setCategoryPages(temp);
  };

  const handleOnChangePageName = (e, index) => {
    const temp = [...categoryPages];
    const props = { ...temp[index] };
    props.pageName = e.target.value;
    temp[index] = props;
    setCategoryPages(temp);
  };

  const onSubmit = (data) => {
    if (categoryPages.length <= 0) {
      modalDispatch({
        type: "SHOW_MODAL",
        payload: "need at least 1 page",
        statusCode: 400,
      });
    } else {
      createCategory(data.categoryNameForm);
    }
  };

  useEffect(() => {
    document.title = "Create Category";
    categoryNameFormRef.current.focus();
  }, []);

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
  }, [categoryPages]);

  return (
    <div className="navbar-margin">
      <div className="create-category">
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="category-name">
            <h2>what is the name of the category?</h2>
            {modalState.isShowMessageModal && (
              <MessageModal
                closeModal={closeModal}
                content={modalState.messageModalContent}
                statusCode={modalState.messageModalStatusCode}
              />
            )}
            <div className="form-input">
              <input
                id="categoryNameForm"
                className={errors.categoryNameForm && "form-input-error"}
                {...register("categoryNameForm", {
                  required: "this field is required",
                })}
                ref={(e) => {
                  ref(e);
                  categoryNameFormRef.current = e; // you can still assign to ref
                }}
              />
              <label htmlFor="categoryNameForm">
                <span></span>
              </label>
              {errors.categoryNameForm && (
                <span className="error-message">
                  <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;
                  {errors.categoryNameForm.message}
                </span>
              )}
            </div>
            <div className="button-container">
              <ButtonRipple
                fa={<FontAwesomeIcon icon={faPlus} />}
                iconIsLeft={true}
                type="submit"
                text="add category"
              />
              <ButtonRipple
                fa={<FontAwesomeIcon icon={faPlus} />}
                iconIsLeft={true}
                onClick={handleClickAddCategoryPage}
                type="button"
                text="add page"
              />
            </div>
          </section>
          <section className="category-pages">
            {categoryPages &&
              categoryPages.map((props, index) => {
                return (
                  <div className="category-page" key={index}>
                    <div className="form-input">
                      <input
                        id="categoryPageNameFrom"
                        type="text"
                        onChange={(e) => handleOnChangePageName(e, index)}
                        value={props.pageName}
                      />
                      <label htmlFor="categoryPageNameFrom">
                        <span>enter page {index + 1} name:</span>
                      </label>
                      <ButtonRipple
                        fa={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => handleClickDeleteCategoryPage(index)}
                        type="button"
                      />
                    </div>
                  </div>
                );
              })}
          </section>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
