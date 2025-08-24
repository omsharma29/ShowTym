import { Input } from "@/components/ui/input";
import Logo from "../assets/Logo.png";
import {Search} from "lucide-react"

function Navbar() {
  return (
    <div className="grid md:grid-cols-3  grid-cols-2 gap-2 rounded-2xl justify-center md:sticky top-0 z-50 bg-white border-2 shadow-2xl max-w-full w-[90%] mx-auto p-2">

      {/* Logo */}
      <div className=" w-15 md:w-25 h-auto justify-self-center">
        <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* Search Box */}
      <div className="w-full mt-2 md:mt-0 p-3 col-span-2 md:col-span-1 md:w-[100%] flex items-center order-3 md:order-2 self-center">
        <Input className="w-full relative rounded-4xl " placeholder="Search movies" />
        <Search className="absolute md:right-[36%] right-[15%] pointer mx-2"/>
      </div>

      {/* Avatar */}
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full justify-self-center self-center  bg-black flex-shrink-0 order-2 md:order-3"></div>

    </div>
  );
}

export default Navbar;
