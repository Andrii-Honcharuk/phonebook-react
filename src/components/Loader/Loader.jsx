import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div>
      <p className={css.spinnerText}>Please wait for start server</p>
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
