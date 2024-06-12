import { useState } from "react";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";

const CreateAndEditBook = ({ method, url }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookData({ ...bookData, [name]: value });
  };
  const handleSave = async () => {
    // if (!bookData.title && !bookData.author && !bookData.publishYear) {
    //   return setError(true);
    // }
    try {
      const token = getToken();
      console.log(token);
      const data = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });
      console.log(data);
      const json = await data.json();
      console.log(json);
      if (!data.ok) {
        return setError(json.message);
      }

      setBookData({
        title: "",
        author: "",
        publishYear: "",
      });
      navigate("/books");
      setError("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="space-y-3">
      <BackButton />
      <h2 className="font-semibold text-3xl">Create Book</h2>
      <div className="mx-auto border-2 border-cyan-700 max-w-xl rounded-lg p-10 *:flex *:flex-col *:items-center  *:gap-1 space-y-7">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={bookData.title}
            className="border border-gray-600 p-1 rounded-md w-full"
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            onChange={handleChange}
            value={bookData.author}
            className="border border-gray-600 p-1 rounded-md w-full"
          />
        </div>
        <div>
          <label>Publish Year</label>
          <input
            type="text"
            name="publishYear"
            onChange={handleChange}
            value={bookData.publishYear}
            className="border border-gray-600 p-1 rounded-md w-full"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          onClick={handleSave}
          className="bg-cyan-500 w-3/4 mx-auto rounded-md p-1 font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateAndEditBook;
