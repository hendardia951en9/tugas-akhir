import React, { useRef } from "react";
import "./buttonripple.css";

const ButtonRipple = ({
  className,
  fa,
  iconIsLeft,
  name,
  onClick,
  text,
  type,
}) => {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    let rect = buttonRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    buttonRef.current.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 300);
  };

  return (
    <button
      className={"button " + className}
      name={name}
      onClick={onClick}
      onMouseDown={handleClick}
      ref={buttonRef}
      type={type}
    >
      {iconIsLeft ? (
        <>
          {fa && <span style={{ display: "inline" }}>{fa}&nbsp;</span>}
          {text}
        </>
      ) : (
        <>
          {text}
          {fa && <span style={{ display: "inline" }}>&nbsp;{fa}</span>}
        </>
      )}
    </button>
  );
};

export default ButtonRipple;
