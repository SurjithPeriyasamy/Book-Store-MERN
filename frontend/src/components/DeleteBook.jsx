import BackButton from "./BackButton";
import { API_BASE_URL } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const data = await fetch(API_BASE_URL + "/" + id, {
        method: "DELETE",
      });
      const json = await data.json();
      console.log(json);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="space-y-3">
      <BackButton />
      <h2 className="font-semibold text-3xl">Delete Book</h2>
      <div className="mx-auto mt-24 rounded-md space-y-5 border-2 border-cyan-700 p-7 w-fit">
        <h4 className="text-xl">Are you sure you want to Delete this Book</h4>
        <button
          onClick={handleDelete}
          className="bg-red-600 relative before:h-full before:w-full before:bg-fuchsia-600 before:absolute before:left-0 before:top-0 before:content-['Hover__Me'] hover:before:content-[''] before:max-lg:content-none before:content-center before:rounded-md before:font-semibold before:hover:h-0 before:duration-500 text-white p-2 rounded-md w-full"
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
