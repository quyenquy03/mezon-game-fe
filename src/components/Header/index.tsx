import UserInfomation from "../UserInfomation";

const Header = () => {
  return (
    <header className='absolute z-10 top-2 left-2 right-2 flex justify-between items-center h-[55px] rounded-t-lg'>
      <UserInfomation />
      <div className='setup-button'>
        <span className='cursor-pointer'>
          <img className='w-[45px] h-[45px] active:scale-98' src='setup-button.png' />
        </span>
      </div>
    </header>
  );
};
export default Header;
