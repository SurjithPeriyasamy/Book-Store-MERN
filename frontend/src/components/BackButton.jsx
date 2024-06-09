import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Link to={"/"}>
      <div className="bg-cyan-800 py-2 px-4 w-fit rounded-md">
        <IoMdArrowRoundBack className="text-white " />
      </div>
    </Link>
  );
};

export default BackButton;
