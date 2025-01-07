import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useGameStore from "@/stores/gameStore";
import useUserStore from "@/stores/userStore";
import { useMemo } from "react";
const EndGameResult = () => {
  const gameResult = useGameStore((state) => state.gameResult);
  const currentUser = useUserStore((state) => state.currentUser);
  const isShowGameResult = useGameStore((state) => state.isShowGameResult);
  const isWinner = useMemo(() => {
    return gameResult?.winner === currentUser?.id;
  }, [currentUser, gameResult]);
  return (
    <Dialog open={isShowGameResult}>
      <DialogContent
        className='sm:max-w-[350px]'
        aria-describedby='modal-description'
        aria-labelledby='modal-title'
        role='dialog'
      >
        <DialogTitle className='text-center text-[20px] hidden'>Tạo phòng</DialogTitle>
        <div className='rounded-lg p-2 flex justify-center'>
          <div className='w-[270px] min-h-[350px] bg-[url("/games/result-bg.png")] bg-center bg-contain bg-no-repeat'>
            <div className='flex justify-center items-center h-[170px]'>
              <img className='w-[130px]' src={isWinner ? "/games/result-victory.png" : "/games/result-defeat.png"} alt='result' />
            </div>
            <div className='flex justify-center items-center flex-col font-titan '>
              <span className='text-[22px] text-gray-600'>{isWinner ? "Bạn thắng" : "Bạn thua"}</span>
              <div className='flex items-center gap-2 mt-1'>
                <span className={`text-[25px] ${isWinner ? " text-green-800" : "text-red-700"}`}>
                  {isWinner ? "+" : "-"}
                  {isWinner ? gameResult?.totalBet : gameResult?.betOfOneGame}
                </span>
                <img className='w-[20px]' src='/coin.png' alt='coin' />
              </div>
            </div>
            <div className='flex justify-center items-center mt-4'>
              <button className='min-w-[50px] bg-green-800 rounded-2xl text-xl font-titan px-5 py-1 hover:bg-green-900 transition-all active:scale-[0.98]'>
                OK
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EndGameResult;
