import { ClipLoader } from "react-spinners";
import Navbar from "../pageComps/Navbar";
import React, { Suspense } from "react";

const UpcomingMovie = React.lazy(() => import(`@/pageComps/UpcomingMovie`))
const IndianMovirs = React.lazy(() => import(`@/pageComps/IndianMovirs`))
const USAMovies = React.lazy(() => import(`@/pageComps/USAMovies`))

export default function HomePage() {
    return (
        <div className="max-w-full">
            <Navbar />
            
            {/* Single Suspense wrapping all sections */}
            <Suspense fallback={
                <div className="flex items-center justify-center h-screen">
                     <ClipLoader size={60} color="#3b82f6" /> {/* Blue spinner */}
                </div>
            }>
                <div className="body flex flex-col">
                    <div className="upcomingMovies lg:pt-10 md:pt-8 pt-7">
                        <UpcomingMovie />
                    </div>
                    <div className="topIndianMovies lg:pt-10 md:pt-8 pt-7">
                        <IndianMovirs />
                    </div>
                    <div className="USmovies lg:pt-10 md:pt-8 pt-7">
                        <USAMovies />
                    </div>
                </div>
            </Suspense>

            <div className="footer"></div>
        </div>
    )
}
