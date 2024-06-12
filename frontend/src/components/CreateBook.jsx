import { API_BASE_URL } from "../utils/constants";
import CreateAndEditBook from "./CreateAndEditBook";

const CreateBook = () => {
  return <CreateAndEditBook method="POST" url={`${API_BASE_URL}/books`} />;
};

export default CreateBook;
