import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { API_BASE_URL } from "../utils/constants";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch(API_BASE_URL + "/" + id);
      const json = await data.json();
      setBook(json.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const { _id, title, author, publishYear, createdAt, updatedAt } = book;
  return (
    <div className="space-y-3">
      <BackButton />
      <h2 className="font-semibold text-3xl">Show Book</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="*:flex *:gap-10  *:first:text-gray-600 w-fit border-2 border-cyan-700 rounded-lg p-4 space-y-5">
          <div>
            <span key={_id} className="capitalize text-gray-600 font-semibold">
              id{" "}
            </span>
            <span>{_id}</span>
          </div>
          <div>
            <span className="capitalize text-gray-600 font-semibold">
              title
            </span>
            <span>{title}</span>
          </div>
          <div>
            <span className="capitalize text-gray-600 font-semibold">
              author{" "}
            </span>
            <span>{author}</span>
          </div>
          <div>
            <span className="capitalize text-gray-600 font-semibold">
              publish year
            </span>
            <span>{publishYear}</span>
          </div>
          <div>
            <span className="capitalize text-gray-600 font-semibold">
              create time{" "}
            </span>
            <span>{new Date(createdAt).toString()}</span>
          </div>
          <div>
            <span className="capitalize text-gray-600 font-semibold">
              update time{" "}
            </span>
            <span>{new Date(updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
