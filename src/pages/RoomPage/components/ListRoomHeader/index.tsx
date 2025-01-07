const ListRoomHeader = () => {
  return (
    <div className='flex justify-center items-center w-full '>
      <div className='w-[300px] h-[55px] rounded-lg flex justify-center items-center relative'>
        <img className='w-full h-full' src='/user-name.png' />
        <span className='absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex w-full justify-center items-center text-white font-bold '>
          DANH SÁCH CÁC PHÒNG ĐẤU
        </span>
      </div>
    </div>
  );
};
export default ListRoomHeader;
