import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim() === "") return;

    navigate(`/banks?pincode=${pincode}`);
  };

  return (
    <div className="min-h-30 ">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center gap-3 m-9 "
      >
        <input
          type="number"
          
          value={pincode}
          placeholder="Enter pincode"
          onChange={(e) => setPincode(e.target.value)}
          className="lg:w-64 w-50 px-4 py-2 text-white rounded-md border border-gray-300"
        />
        <button
          type="submit"
          className="lg:px-6 lg:py-2 px-3 rounded-md border hover:bg-white/30 transition font-semibold shadow-md"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Form;
