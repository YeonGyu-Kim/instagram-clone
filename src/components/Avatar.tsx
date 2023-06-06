type Props = {
  image?: string | null;
  size?: 'small' | 'normal';
  highlight: boolean;
};

export default function Avatar({
  image,
  size = 'normal',
  highlight = false,
}: Props) {
  const getContainerStyle = (size: string, highlight: boolean) => {
    const baseStyle = 'rounded-full';
    const highlightStyle = highlight
      ? 'bg-gradient-to-bl from-fuchsia via-rose to-amber'
      : '';
    const sizeStyle = size === 'small' ? 'w-9 h-9' : 'w-[68px] h-[68px]';
    return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
  };
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className='w-full h-full object-cover rounded-full p-[0.1rem]'
        src={image ?? undefined}
        alt='user-profile'
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
