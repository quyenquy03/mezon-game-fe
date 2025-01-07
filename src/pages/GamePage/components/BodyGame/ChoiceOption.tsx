import { CHOICE_OPTIONS } from "@/constants/ChoiceOptions";
import useGameStore from "@/stores/gameStore";

const ChoiceOption = () => {
  const setCurrentChoice = useGameStore((state) => state.setCurrentChoice);
  const currentChoice = useGameStore((state) => state.currentChoice);
  const handleChangeChoice = (choice: Choice) => {
    setCurrentChoice(choice);
  };
  return (
    <div className='flex justify-center items-center gap-4 mt-3'>
      <div
        onClick={() => handleChangeChoice(CHOICE_OPTIONS.PAPER)}
        className={`w-[60px] h-[60px] cursor-pointer relative bg-slate-50 rounded-lg shadow-lg shadow-slate-600 bg-[url("/games/paper-1.png")] bg-cover bg-center ${
          currentChoice === CHOICE_OPTIONS.PAPER ? "border-4 border-blue-500" : ""
        }`}
      ></div>
      <div
        onClick={() => handleChangeChoice(CHOICE_OPTIONS.ROCK)}
        className={`w-[60px] h-[60px] cursor-pointer relative bg-slate-50 rounded-lg shadow-lg shadow-slate-600 bg-[url("/games/rock-1.png")] bg-cover bg-center ${
          currentChoice === CHOICE_OPTIONS.ROCK ? "border-4 border-blue-500" : ""
        }`}
      ></div>
      <div
        onClick={() => handleChangeChoice(CHOICE_OPTIONS.SCISSORS)}
        className={`w-[60px] h-[60px] cursor-pointer relative bg-slate-50 rounded-lg shadow-lg shadow-slate-600 bg-[url("/games/scissors-1.png")] bg-cover bg-center ${
          currentChoice === CHOICE_OPTIONS.SCISSORS ? "border-4 border-blue-500" : ""
        }`}
      ></div>
    </div>
  );
};
export default ChoiceOption;
