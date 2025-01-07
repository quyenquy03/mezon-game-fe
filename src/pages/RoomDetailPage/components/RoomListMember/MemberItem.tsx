import { User } from "@/interface/user/User";

interface MemberItemProps {
  // Props type definition
  member?: User;
}
const MemberItem = ({ member }: MemberItemProps) => {
  return (
    <div className='flex items-center justify-center gap-2 cursor-pointer'>
      <div className='w-[90px] h-[90px] relative'>
        <img
          src={member ? member?.avatar ?? "/games/user.png" : "/games/question-icon.webp"}
          alt=''
          className='w-[45px] bg-white absolute left-[50%] top-[28px] translate-x-[-50%] z-0'
        />
        <img src='/games/khung-avatar.png' alt='' className='w-[80px] left-[50%] translate-x-[-50%] absolute z-1' />
      </div>
    </div>
  );
};
export default MemberItem;
