import React, { useRef } from "react";
import "./buttonripple.css";

const ButtonRipple = ({
  className,
  disabled,
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
      className={"button-ripple " + className + " " + (disabled && "disabled")}
      disabled={disabled}
      name={name}
      onClick={onClick}
      onMouseDown={handleClick}
      ref={buttonRef}
      type={type}
    >
      {iconIsLeft ? (
        <>
          {fa}
          {text}
        </>
      ) : (
        <>
          {text}
          {fa}
        </>
      )}
    </button>
  );
};

export default ButtonRipple;
