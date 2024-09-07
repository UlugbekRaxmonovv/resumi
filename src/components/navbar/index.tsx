import { Link } from 'react-router-dom';
import logo from '../../assets/images/riz1.png'
import { TbLogin2 } from "react-icons/tb";


interface HomeProps {
    setSearch: (search: string) => void;
    search: string;
  }
const Navbar: React.FC<HomeProps>  = ({setSearch,search}) => {
    return (
       <>
       <header className="bg-white bg-opacity-50 z-80 fixed top-0 left-0 right-0" >
        <div className="container">
            <nav className=" flex justify-between items-center py-[30px] ">
                <ul>
                <Link to={'/'}>  <img src={logo} alt=""  className='w-[100px] h-[40px] object-contain z-50 cursor-pointer'/></Link>
                </ul>
             <div className="px-[100px] w-full">
             <div className="h-[40px] w-full bg-white  flex px-[10px] rounded-lg" >
               <input type="text"  className="outline-none w-full"  value={search}  onChange={(e) => setSearch(e.target.value)} />
               </div>
             </div>
               <Link to={'/login'}>
               <div className="px-[5px] py-[5px] bg-slate-400 rounded-md cursor-pointer">
                    <div className="text-2xl text-white">
                         <TbLogin2/>
                    </div>
                </div>
               </Link>
            </nav>
        </div>
       </header>
       </>
    );
}

export default Navbar;
