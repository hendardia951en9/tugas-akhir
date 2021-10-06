import React from "react";

import "./notfound.css";

const NotFound = () => {
  return (
    <div class="not-found">
      <div class="not-found-404">
        <h1
          style={{
            backgroundImage: "url('/assets/images/global/not_found.jpg')",
          }}
        >
          Oops!
        </h1>
      </div>
      <h2>404 - Page not found</h2>
      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFound;
