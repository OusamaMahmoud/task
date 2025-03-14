import { ToastContainer } from "react-toastify";
import SearchForm from "./components/SearchForm";

export default function App() {
  return (
    <div className="flex flex-col container mx-auto">
      <ToastContainer />

      <div className="mt-5">
        <SearchForm />
      </div>
    </div>
  );
}
