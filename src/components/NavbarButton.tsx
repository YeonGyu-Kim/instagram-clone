'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiHome6Line } from 'react-icons/ri';
import { RiHome6Fill } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { AiFillPlusSquare } from 'react-icons/ai';
import { useState } from 'react';

export default function NavbarButton() {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const pathName = usePathname();
  const menu = [
    {
      href: '/',
      icon: <RiHome6Line size={32} />,
      //clickedIcon: <AiFillHome size={32} />,
      text: '홈',
    },
    {
      icon: <BiSearch size={32} />,
      //clickedIcon: <RiSearchFill size={32} />,
      text: '검색',
    },
    {
      icon: <AiOutlinePlusSquare size={32} />,
      //clickedIcon: <RiSearchFill size={32} />,
      text: '만들기',
    },
  ];

  const handleButton = (text: string) => {
    if (text === '검색') {
      setOpenSearchModal(true);
    }
  };
  return (
    <ul className='mt-6'>
      {menu.map((item, index) => (
        <li
          onClick={() => handleButton(item?.text)}
          key={`${item}-${index}`}
          className='py-2'
        >
          {item?.href ? (
            <Link href={item?.href} className='flex items-center'>
              {item?.icon}
              <span className='text-[18px] ml-3'>{item?.text}</span>
            </Link>
          ) : (
            <button className='flex items-center'>
              {item?.icon}
              <span className='text-[18px] ml-3'>{item?.text}</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
