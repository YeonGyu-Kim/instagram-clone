import PostListCard from '@/components/PostListCard';
import { parseDate } from '@/util/date';
import { render, screen } from '@testing-library/react';
import { withRouter } from 'next/router';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('PostListCard', () => {
  const post = {
    username: 'lee',
    userImage:
      'https://lh3.googleusercontent.com/a/AGNmyxZN6KVGXD7LhM-Ppy6kKWHYJruXojxX_dngrV2Z=s96-c',
    image:
      '/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fahsuynfv%2Fproduction%2F06dd22c42c5f030493eb025fd8b9f4d28fb807c4-1920x1080.jpg%3Fw%3D800&w=1080&q=75',
    likes: [],
    text: '풍경',
    comments: 8,
    id: '449fe9e7-b176-4a5c-80b5-01bcf501fa2a',
    createdAt: '2023-06-26T17:05:54Z',
  };
  it('포스트 카드 아이템 렌더링', () => {
    render(<PostListCard post={post} priority={false} />);

    //const image = screen.getAllByRole('img');
    expect(screen.getAllByText(post.username));
    expect(screen.getByText(post.text)).toBeInTheDocument();
    expect(screen.getByText(parseDate(post.createdAt))).toBeInTheDocument();
  });

  it('스냅샷 테스트', () => {
    const component = renderer.create(
      <PostListCard post={post} priority={false} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  // 배포 test
});
