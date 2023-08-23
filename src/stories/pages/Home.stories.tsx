import type { Meta, StoryObj } from '@storybook/react';

import { Home } from './Home';

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  tags: ['autodocs'],
  argTypes: {
    // 👇 All Button stories expect a label arg
    text: {
      description: '버튼 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args\
export const Primary: Story = {
  args: {
    text: 'Button',
  },
};
/* export const Pri: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Sec: Story = {
  args: {
    label: 'Button',
  },
};

export const Lar: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Sm: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
 */
