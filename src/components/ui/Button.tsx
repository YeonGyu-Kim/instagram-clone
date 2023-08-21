import { PulseLoader } from 'react-spinners';

type Props = {
  text: string;
  onClick: () => void;
  blue?: boolean;
  isUpdating?: boolean;
};

export default function Button({ text, onClick, blue, isUpdating }: Props) {
  return (
    <button
      className={`rounded-md text-sm font-bold py-1.5 px-4 ${
        blue ? 'bg-btn-blue' : 'bg-btn-gray'
      }`}
      onClick={() => onClick()}
    >
      {isUpdating ? <PulseLoader size={6} color='#EFEFEF' /> : text}
    </button>
  );
}
