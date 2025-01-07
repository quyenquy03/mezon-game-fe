import { Outlet } from "react-router-dom";

const RoomLayout: React.FC = () => {
  return (
    <div className='max-w-[950px]  sm:max-h-[550px] shadow-indigo-500 shadow-2xl  rounded-lg w-full h-full bg-[url("/bg-main.png")] bg-cover bg-center bg-no-repeat '>
      <div className='h-full w-full bg-[#21107266] rounded-lg p-2 relative'>
        <div className='h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default RoomLayout;
