import UpcomingMovie from "@/pageComps/UpcomingMovie";
import Navbar from "../pageComps/Navbar";
import IndianMovirs from "@/pageComps/IndianMovirs";
import USAMovies from "@/pageComps/USAMovies";

export default function HomePage() {
  return (
    <div className="max-w-full ">

            <Navbar/>

        <div className="body flex flex-col">
            <div className="upcomingMovies lg:pt-10 md:pt-8 pt-7">
                <UpcomingMovie/>
            </div>
            <div className="topIndianMovies lg:pt-10 md:pt-8 pt-7">
                <IndianMovirs/>
            </div>
            <div className="USmovies lg:pt-10 md:pt-8 pt-7">
                <USAMovies/>
            </div>
        </div>
        <div className="footer"></div>
    </div>
  )
}
