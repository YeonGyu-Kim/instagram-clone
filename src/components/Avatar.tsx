type AvatarSize = 'small' | 'medium' | 'large';

type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight: boolean;
};

const getContainerSizeStyle = (size: AvatarSize) => {
  switch (size) {
    case 'small':
      return 'w-9 h-9';
    case 'medium':
      return 'w-[52px] h-[52px]';
    case 'large':
      return 'w-[68px] h-[68px]';
  }
};

const getImageSizeStyle = (size: AvatarSize) => {
  switch (size) {
    case 'small':
      return 'w-[32px] h-[32px] p-[0.1rem]';
    case 'medium':
      return 'w-12 h-12 p-[0.1rem]';
    case 'large':
      return 'w-16 h-16 p-[0.15rem]';
  }
};

const getContainerStyle = (size: AvatarSize, highlight: boolean) => {
  const baseStyle = 'flex justify-center items-center rounded-full';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia via-rose to-amber'
    : '';
  const sizeStyle = getContainerSizeStyle(size);
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`object-cover rounded-full ${
          highlight && 'bg-bg-black'
        }  ${getImageSizeStyle(size)}`}
        src={image ?? undefined}
        alt='user-profile'
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
