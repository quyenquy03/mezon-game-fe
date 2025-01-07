interface PlayerChoosedProps {
  // Add props here
  position?: "left" | "right";
  choice?: string;
}
const PlayerChoosed = ({ position = "left", choice }: PlayerChoosedProps) => {
  return (
    <div
      className={`absolute w-[60px] sm:w-[80px] h-[60px] sm:h-[80px] ${
        position === "left"
          ? "left-[calc(50%-108px)] sm:left-[calc(50%-150px)]"
          : "right-[calc(50%-108px)] sm:right-[calc(50%-150px)]"
      } top-[calc(70px)] sm:top-[90px]`}
    >
      <img
        className='w-[50px] sm:w-[60px] absolute left-[50%] rounded-full translate-x-[-50%] top-1'
        src={`/games/${choice}-1.png`}
        alt=''
      />
      <img className='w-[60px] sm:w-[80px] absolute z-1 left-0 bottom-0' src='/games/choice-box.png' alt='' />
    </div>
  );
};
export default PlayerChoosed;
