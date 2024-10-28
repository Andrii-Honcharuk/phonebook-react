import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";
import { useEffect, useState } from "react";

export default function Loader() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={css.spinnerContainer}>
      <div className={css.background}></div>
      {showText && (
        <p className={css.spinnerText}>Please wait for start server</p>
      )}
      <div className={css.spinnerContainer}>
        <div className={css.background}></div>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="black"
          strokeWidth="5"
          animationDuration="0.15"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
}
