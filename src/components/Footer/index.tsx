import { ROUTES } from "@/routes/path";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleGoToRoomPage = () => {
    navigate(ROUTES.ROOM);
  };
  const handleGoToHomePage = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <footer className='absolute bottom-0 left-0 right-0 flex justify-center h-[70px] rounded-b-lg bg-[#59527b85]'>
      <div
        onClick={handleGoToHomePage}
        className='flex justify-center items-center flex-1 cursor-pointer hover:bg-[#59527b85] shadow-[#59527b] shadow-inner active:scale-[98%] transition-all'
      >
        <img className='w-[45px] h-[45px]' src='/swords.png' />
      </div>
      <div
        onClick={handleGoToRoomPage}
        className='flex justify-center items-center flex-1 cursor-pointer hover:bg-[#59527b85] shadow-[#59527b] shadow-inner active:scale-[98%] transition-all'
      >
        <img className='w-[60px] h-[60px]' src='/swords.png' />
      </div>
      <div className='flex justify-center items-center flex-1 cursor-pointer hover:bg-[#59527b85] shadow-[#59527b] shadow-inner active:scale-[98%] transition-all'>
        <img className='w-[45px] h-[45px]' src='/swords.png' />
      </div>
    </footer>
  );
};
export default Footer;
