import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBloodBanks } from "../utils/helper.js";
import FormResults from "../components/FormResults.jsx";
import Navbar from "../components/Navbar.jsx";
import Loader from "../components/Loader.jsx";

function Results() {

  

  const [searchParams] = useSearchParams();
  const pincode = searchParams.get("pincode");

  const [banksPresent, setbanksPresent] = useState([]);
  const [error, setError] = useState("");

  // loader
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!pincode) return;

    const fetchdata = async () => {
      try {
        setLoading(true)
        setError(null);
        const res = await fetchBloodBanks(pincode);
        setbanksPresent(res.data || []);

        const timer = setTimeout(() => {
                          setLoading(false);
                      }, 2000);

        return () => clearTimeout(timer);
      } catch (err) {

        setError(err.message || "Error fetching data");
        setbanksPresent([]);
        setLoading(false)
      } 
    };

    fetchdata();
  }, [pincode]);

  return (
    <div className="min-h-screen">

      <div className="flex justify-center">
        <Navbar/>
      </div>


      {loading ? (
        <div className="p-6 flex justify-center items-center min-h-screen">
          <Loader/>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-medium mt-30">{error}</p>
      ) : (
        <div>
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6 mt-30">
          Nearby Blood Banks for Pincode: {pincode}
        </h2>
        
          <FormResults banks={banksPresent} />

        </div>
    )}
    
    </div>
  );
}

export default Results;
