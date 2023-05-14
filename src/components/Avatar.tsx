export default function Avatar({ image }: { image?: string | null }) {
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className='rounded-full w-9 h-9 mr-3'
        src={image ?? undefined}
        alt='user-profile'
      />
    </div>
  );
}
