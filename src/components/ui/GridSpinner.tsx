import dynamic from 'next/dynamic';

const MoonLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.MoonLoader),
  {
    ssr: false,
  }
);

export default function GridSpinner() {
  return <MoonLoader size={32} color='#F60485' />;
}
