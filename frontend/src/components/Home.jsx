import { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
import { MdEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { addBooks } from "../utils/booksSlice";
import { API_BASE_URL } from "../utils/constants";
import { useCurrentUser } from "../utils/hooks/useCurrentUser";
import { useCookie } from "../utils/hooks/useCookie";
const Home = () => {
  const allBooks = useSelector((store) => store.books);
  const [books, setBooks] = useState([]);
  // const [skipCount, setSkipCount] = useState(0);
  const [currPage, setCurrpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const skipCalc = (currPage - 1) * 3;
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.loggedInUser);
  useCurrentUser();
  const token = useCookie;
  useEffect(() => {
    fetchData();
  }, [currPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `${API_BASE_URL}/books?skip=${skipCalc}&limit=3`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token("jwt")}` },
        }
      );
      const json = await data.json();
      setBooks(json.data);
      dispatch(addBooks(json));
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  const page = [];
  for (let i = 1; i <= Math.ceil(allBooks.count / 3); i++) {
    page.push(i);
  }

  return (
    <div className="space-y-5">
      <div className="p-2 bg-cyan-600 w-fit rounded-lg mx-auto flex flex-col items-center">
        <div>Welcome To My Book Store</div>
        <h3>Hello {user.username} !!!!!</h3>
        <h4>{user.email}</h4>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-4xl font-semibold">Books List</h2>
        <Search setBooks={setBooks} />
        <Link to="/books/create">
          <MdAddBox className="text-blue-500 text-2xl " />
        </Link>
      </div>
      <table className="w-full  border-separate border-spacing-2">
        <thead>
          <tr className="*:border *:border-slate-500 *:rounded-md">
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>PublishYear</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Spinner />
          ) : (
            books.map((book, index) => (
              <tr
                className="*:border text-center *:border-slate-500 *:rounded-md *:p-1"
                key={book._id}
              >
                <td>{index + 1 + skipCalc}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishYear}</td>
                <td className="flex justify-evenly *:text-2xl ">
                  <Link to={`/books/details/${book._id}`}>
                    <FcViewDetails />
                  </Link>
                  {user._id === book.user_id && (
                    <>
                      <Link to={`/books/edit/${book._id}`}>
                        <MdEditNote className="text-yellow-500" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdDeleteSweep className="text-red-600" />
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mx-auto w-fit flex *:px-3 *:py-1  gap-5 text-white *:rounded-lg">
        {books.length &&
          page.map((p) => (
            <button
              onClick={() => {
                setCurrpage(p);
              }}
              className={`${p === currPage ? "bg-red-600" : "bg-gray-600"}`}
              key={p}
            >
              {p}
            </button>
          ))}
      </div>
    </div>
  );
};
export default Home;
