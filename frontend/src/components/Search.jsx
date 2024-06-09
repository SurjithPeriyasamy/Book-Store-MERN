import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResults } from "../utils/searchSlice";
import { API_BASE_URL } from "../utils/constants";

const Search = ({ setBooks }) => {
  const [authorSearch, setAuthorSearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const { authorResults, titleResults } = useSelector((store) => store.search);
  const books = useSelector((store) => store.books.books);
  const dispatch = useDispatch();
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (authorResults[authorSearch]) {
        setBooks(authorResults[authorSearch]);
      } else {
        if (authorSearch) {
          (async function () {
            try {
              const data = await fetch(
                `${API_BASE_URL}/search?query=${authorSearch}`
              );
              const json = await data.json();
              console.log(json);
              setBooks(json.data);
              dispatch(
                addResults({
                  searchBy: "authorResults",
                  data: { [authorSearch]: json.data },
                })
              );
            } catch (error) {
              console.log(error.message);
            }
          })();
        }
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [authorSearch]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (titleResults[titleSearch]) {
        setBooks(titleResults[titleSearch]);
      } else {
        if (titleSearch) {
          const results = books.filter((book) =>
            book.title
              .toLowerCase()
              .replace(/ /g, "")
              .includes(titleSearch.toLowerCase().replace(/ /g, ""))
          );
          setBooks(results);
          dispatch(
            addResults({
              searchBy: "authorResults",
              data: { [titleSearch]: results },
            })
          );
        }
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [titleSearch]);

  return (
    <div className="flex items-center gap-10 *:border-2 *:border-cyan-700 *:p-2 *:outline-none *:rounded-md">
      <input
        type="text"
        name="author"
        onChange={(e) => {
          if (titleSearch) {
            setTitleSearch("");
          }
          setAuthorSearch(e.target.value);
        }}
        placeholder="Search by Author"
        value={authorSearch}
      />
      <input
        type="text"
        name="title"
        onChange={(e) => {
          if (authorSearch) {
            setAuthorSearch("");
          }
          setTitleSearch(e.target.value);
        }}
        placeholder="searchByTitle"
        value={titleSearch}
      />
    </div>
  );
};

export default Search;
