import { Input } from "@/components/ui/input";
import Logo from "../assets/Logo.png";
import SignupComp from "./SignupComp";
import { useSearch } from "@/store/Store";
import { useEffect } from "react";
import { SearchFetch } from "@/functions/SearchFetch";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const { search, setSearch, results, setResults, loading, setLoading } = useSearch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!search) return setResults([]);
    const debounce = setTimeout(async () => {
      setLoading(true)
      try {
        const fetch = await SearchFetch(search)
        setResults(fetch)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }, 1000)

    return () => clearTimeout(debounce)
  }, [search])

  return (
    <div className="grid md:grid-cols-3  grid-cols-2 gap-2 rounded-2xl justify-center md:sticky top-0 z-50 bg-white border-2 shadow-2xl max-w-full w-[90%] mx-auto p-2">

      {/* Logo */}
      <div className=" w-15 md:w-25 h-auto justify-self-center">
        <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* Search Box */}
      <div className="w-full mt-2 md:mt-0 p-3 col-span-2 md:col-span-1 md:w-[100%] flex items-center order-3 md:order-2 self-center">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-4xl"
          placeholder="Search movies"
        />

        {loading && (
          <div className="absolute top-full left-[32%] w-1/3 bg-white border mt-1 p-4 shadow-lg z-50 flex justify-center">
            <ClipLoader size={40} color="#3b82f6" />
          </div>
        )}

        {results.length > 0 && !loading && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2/3 md:w-1/3 max-h-64  bg-white overflow-y-auto border mt-1 p-2 shadow-lg z-50 flex flex-col gap-2">
            {results.map((res) => (
              <button onClick={() => navigate(`/${res.id}/details`)} key={res.id} className="flex items-center gap-2">
                <img src={res.primaryImage} alt={res.primaryImage} className="w-12 h-16 object-cover rounded" />
                <span>{res.originalTitle}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className=" rounded-full justify-self-center self-center  flex-shrink-0 order-2 md:order-3">
        <SignupComp />
      </div>

    </div>
  );
}

export default Navbar;
