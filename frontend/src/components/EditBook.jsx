import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import CreateAndEditBook from "./CreateAndEditBook";

function EditBook() {
  const { id } = useParams();
  return <CreateAndEditBook method="PUT" url={`${API_BASE_URL}/books/${id}`} />;
}

export default EditBook;
