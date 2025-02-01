import { useEffect, useState } from "react";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loading";
import Testimonial from "../../components/Testimonial/Testimonial";
import WorkerCard from "../../components/Workers/WorkerCard";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";

const Workers = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: workers,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/workers?query=${debounceQuery}`);

  // Ensure workers is an array
  const workersArray = Array.isArray(workers) ? workers : [];

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Worker</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#FFFFFF] rounded-md flex items-center justify-space-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[5px] hover:bg-[#3fe3f] " 
              onClick={handleSearch}
            >
              Search
            </button>  
          </div>
          
        </div>
        

        <section>
          <div className="container">
            {loading && <Loader />}
            {error && <Error message={error.message} />}
            {!loading && !error && workersArray.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {workersArray.map((worker) => (
                  <WorkerCard key={worker._id} worker={worker} />
                ))}
              </div>
            )}
            {!loading && !error && workersArray.length === 0 && (
              <p>No doctors or workers found</p>
            )}
          </div>
        </section>
      </section>

      
    </>
  );
};

export default Workers;
