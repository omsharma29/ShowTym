import { Input } from "@/components/ui/input"
import Logo from "../assets/Logo.png"
function Navbar() {
    return (
        
        <div className="  flex flex-row rounded-2xl sticky top-0 z-50 bg-white  border-2 shadow-2xl justify-around items-center max-w-full w-[90%] mx-auto ">
            <div className="lg:w-25 md:g-gradient-to-b from-[#041c45]/20  to-w-20 w-15  h-auto">
                <img src={Logo} className=" bg-gradient-to-b from-[#041c45]/20" alt="" />
        </div>
            
            <Input className="   w-[30%]" placeholder="search movies"/>
            <div className="lg:w-10 lg:h-10 md:w-7 md:h-7 w-6 h-6 rounded-[100%] bg-black ">
                
            </div>
        </div>
    )
}

export default Navbar