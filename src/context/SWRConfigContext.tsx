'use client';

import { SWRConfig } from 'swr';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url) => await fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
