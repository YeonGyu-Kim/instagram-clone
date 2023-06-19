type AvatarSize = 'small' | 'medium' | 'large';

type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight: boolean;
};

const getContainerSizeStyle = (size: AvatarSize) => {
  switch (size) {
    case 'small':
      return 'w-[32px] h-[32px]';
    case 'medium':
      return 'w-[56px] h-[56px]';
    case 'large':
      return 'w-[68px] h-[68px]';
  }
};

const getImageSizeStyle = (size: AvatarSize) => {
  switch (size) {
    case 'small':
      return 'w-[32px] h-[32px] p-[0.1rem]';
    case 'medium':
      return 'w-[56px] h-[56px] p-[0.1rem]';
    case 'large':
      return 'w-[68px] h-[68px] p-[0.2rem]';
  }
};

const getContainerStyle = (size: AvatarSize, highlight: boolean) => {
  const baseStyle = 'rounded-full';
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
        className={`object-cover rounded-full ${getImageSizeStyle(size)}`}
        src={image ?? undefined}
        alt='user-profile'
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
