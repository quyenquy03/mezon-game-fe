import useGameStore from "@/stores/gameStore";
import GamePlayer from "./GamePlayer";

const HeaderGame = () => {
  const currentRoundInfo = useGameStore((state) => state.currentRoundInfo);
  const currentRound = useGameStore((state) => state.currentRound);
  const roundResult = useGameStore((state) => state.roundResult);
  console.log(currentRoundInfo);
  return (
    <>
      <div className='header flex  justify-between gap-2 h-[100px] w-full'>
        <GamePlayer position='left' member={currentRoundInfo?.yourInfo} result={roundResult} />
        <div className='w-[170px] flex justify-center relative'>
          <img className='w-full h-[75px]' src='/room-top.png' alt='' />
          <span className='absolute h-[75px] flex items-center justify-center w-full font-bold text-[20px] font-titan mt-1'>
            Round {currentRound ?? 1}
          </span>
        </div>
        <GamePlayer position='right' member={currentRoundInfo?.rivalInfo} result={roundResult} />
      </div>
    </>
  );
};
export default HeaderGame;
