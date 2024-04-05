//pages/Home.jsx

// import Loader from "../components/Loader/Loader";
import PageTitle from "../components/PageTitle/PageTitle";

export default function Home() {
  return (
    <div>
      <PageTitle>
        Phone book welcome page{" "}
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
        </span>
      </PageTitle>

      <p>
        Welcome to your personal online phonebook, where you can store and
        manage your contacts online. To access your contact book, please either
        register or log in.
      </p>
    </div>
  );
}
