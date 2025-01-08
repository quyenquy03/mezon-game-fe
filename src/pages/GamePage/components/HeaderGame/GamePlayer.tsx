import { User } from "@/interface/user/User";

interface IGameMemberProps {
  member?: User;
  position?: "left" | "right";
  result?: string[];
}
const GamePlayer = ({ member, position = "left", result }: IGameMemberProps) => {
  return (
    <div
      className={`flex ${
        position === "left" ? "items-start" : "items-end"
      } justify-center gap-2 cursor-pointer flex-col w-[100px] items-center`}
    >
      <div className='w-[65px] h-[65px] relative'>
        <img
          src={member ? member?.avatar ?? "/games/user.png" : "/games/question-icon.webp"}
          alt=''
          className='w-[38px] bg-white absolute left-[50%] top-[20px] translate-x-[-50%] z-0'
        />
        <img src='/games/khung-avatar.png' alt='' className='w-[80px] left-[50%] translate-x-[-50%] absolute z-1' />
      </div>
      <div className='flex gap-1 '>
        {result?.map((item, index) => {
          if (item === member?.id) {
            return (
              <span
                key={index}
                className='block w-[12px] h-[12px] bg-green-500 rounded-full shadow-lg shadow-green-800 drop-shadow-lg blur-[1px]'
              ></span>
            );
          }
          if (item === null) {
            return (
              <span
                key={index}
                className='block w-[12px] h-[12px] bg-yellow-500 rounded-full shadow-lg shadow-green-800 drop-shadow-lg blur-[1px]'
              ></span>
            );
          }
          return (
            <span
              key={index}
              className='block w-[12px] h-[12px] bg-red-500 rounded-full shadow-lg shadow-red-800 drop-shadow-lg blur-[1px]'
            ></span>
          );
        })}
      </div>
    </div>
  );
};
export default GamePlayer;
