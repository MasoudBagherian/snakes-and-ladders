import { useNavigate } from "react-router-dom";

function Header({ isBtnDisabled }) {
  const navigate = useNavigate();

  function goToHomePage() {
    navigate("/");
  }
  return (
    <div className="flex justify-end py-[2rem]">
      <button
        className="border-b-[2px] border-b-primary-light text-[2rem] disabled:cursor-not-allowed"
        onClick={goToHomePage}
        disabled={isBtnDisabled}
      >
        home
      </button>
    </div>
  );
}

export default Header;
