import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function goToHomePage() {
    navigate("/");
  }
  return (
    <div className="flex justify-end py-[2rem]">
      <button
        className="border-b-[2px] border-b-primary-light text-[2rem]"
        onClick={goToHomePage}
      >
        home
      </button>
    </div>
  );
}

export default Header;
