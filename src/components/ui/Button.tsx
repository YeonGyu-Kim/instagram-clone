type Props = {
  text: string;
  onClick: () => void;
  blue?: boolean;
};

export default function Button({ text, onClick, blue }: Props) {
  return (
    <button
      className={`rounded-md text-sm font-bold py-1.5 px-4 ${
        blue ? 'bg-btn-blue' : 'bg-btn-gray'
      } ${!blue && 'text-bg-black'}`}
    >
      {text}
    </button>
  );
}
