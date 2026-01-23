import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBloodBanks } from "../utils/helper.js";
import FormResults from "../components/FormResults.jsx";
import Navbar from "../components/Navbar.jsx";
import Loader from "../components/Loader.jsx";
import {Link} from "react-router-dom"
import {ArrowLeft} from "lucide-react"

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
                      }, 500);

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
        <div className="flex justify-center items-center mt-60">
          <Loader/>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-medium mt-30">{error}</p>
      ) : (
        <div>

          {/* back button */}
        {/* <Link href="/">
            <button  className="text-white mt-20  hover:text-red-600 hover:bg-zinc-900 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </button>
          </Link> */}
        

        <h2 className="lg:text-2xl text-xl font-bold text-center mb-6 mt-10 lg:mt-30" >
          Nearby Blood Banks for Pincode: {pincode}
        </h2>
        
          <FormResults banks={banksPresent} />

        </div>
    )}
    
    </div>
  );
}

export default Results;
