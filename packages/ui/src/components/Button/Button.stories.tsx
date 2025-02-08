import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Button } from '@/components/Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'UI Component/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'default',
          'destructive',
          'outline',
          'secondary',
          'ghost',
          'link',
        ],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['default', 'sm', 'lg', 'icon'],
      },
    },
    animated: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'default',
    size: 'default',
    animated: false,
    children: 'Primary Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    animated: false,
    children: 'Destructive Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    animated: false,
    children: 'Outline Button',
  },
}

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    animated: false,
    children: 'Small Button',
  },
}

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    animated: false,
    children: 'Large Button',
  },
}

export const Animated: Story = {
  args: {
    variant: 'default',
    size: 'default',
    animated: true,
    children: 'Animated Button',
  },
}
