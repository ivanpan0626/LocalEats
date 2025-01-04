import React from "react";
import styles from "./notFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound({ message, linkedRoute, linkedText }) {
  return (
    <div className={styles.container}>
      {message ? message : "Nothing Found!"}
      <Link to={linkedRoute ? linkedRoute : "/"}>
        {linkedText ? linkedText : "Go to Home Page"}
      </Link>
    </div>
  );
}
