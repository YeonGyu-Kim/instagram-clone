type AvatarSize = 'small' | 'medium' | 'large' | '2xl';

type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight: boolean;
};

type ImageSizeStyle = {
  container: string;
  image: string;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: Props) {
  const getContainerStyle = (size: AvatarSize, highlight: boolean) => {
    const baseStyle = 'flex justify-center items-center rounded-full';
    const highlightStyle = highlight
      ? 'bg-gradient-to-bl from-fuchsia via-rose to-amber'
      : '';
    const { container } = getImageSizeStyle(size);
    return `${baseStyle} ${highlightStyle} ${container}`;
  };

  const getImageSizeStyle = (size: AvatarSize): ImageSizeStyle => {
    switch (size) {
      case 'small':
        return { container: 'w-9 h-9', image: 'w-[32px] h-[32px] p-[0.1rem]' };
      case 'medium':
        return {
          container: 'w-[52px] h-[52px]',
          image: 'w-12 h-12 p-[0.1rem]',
        };
      case 'large':
        return {
          container: 'w-[68px] h-[68px]',
          image: 'w-16 h-16 p-[0.15rem]',
        };
      case '2xl':
        return {
          container: 'w-[150px] h-[150px]',
          image: 'w-[150px] h-[150px] p-[1rem]',
        };
    }
  };
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`object-cover rounded-full ${highlight && 'bg-bg-black'}  ${
          getImageSizeStyle(size)?.image
        }`}
        src={image ?? undefined}
        alt='user-profile'
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
