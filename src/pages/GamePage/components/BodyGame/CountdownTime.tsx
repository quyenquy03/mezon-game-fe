import { useEffect, useState } from "react";
interface IExpiredTimeProps {
  initTime?: number;
  key?: string;
}
const CountdownTime = ({ initTime, key }: IExpiredTimeProps) => {
  const [timeCountDown, setTimeCountDown] = useState(initTime);

  useEffect(() => {
    setTimeCountDown(initTime);
  }, [initTime, key]);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (timeCountDown) {
        setTimeCountDown(timeCountDown - 1);
      }
    }, 1000);
    if (timeCountDown == 0) {
      // Call api to submit skill
      clearInterval(interval);
      return;
    }
    return () => clearTimeout(interval);
  }, [timeCountDown]);

  return (
    <div className='countdown flex  flex-col items-center w-[75px] h-[120px] sm:w-[105px] sm:h-[175px] bg-[#0c225c] absolute top-[45px] sm:top-[60px] left-[50%] transform translate-x-[-50%]'>
      <div className='w-[65px] h-[65px] sm:w-[85px] sm:h-[85px] mt-3 relative'>
        <img className='w-full' src='/games/countdown.png' alt='' />
        <span className='absolute w-[65px] h-[65px] sm:w-[85px] sm:h-[85px] top-0 right-0 flex items-center justify-center text-[35px] font-titan'>
          {timeCountDown}
        </span>
      </div>
      <div>
        <img className='w-[65px] sm:w-[85px] mt-2' src='/games/vs-icon.png' alt='' />
      </div>
    </div>
  );
};

export default CountdownTime;
