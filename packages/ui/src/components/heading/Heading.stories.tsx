import { Meta, StoryObj } from '@storybook/react'
import { Heading } from '@components/heading'

const meta: Meta<typeof Heading> = {
  title: 'UI Component/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A polymorphic heading component that supports h1-h6 and p elements with shadcn styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      description: 'HTML element to render',
      table: {
        type: { summary: 'HeadingTags' },
        defaultValue: { summary: 'p' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
    },
    children: {
      control: 'text',
      description: 'Content to render inside the heading',
    },
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'H1 Heading',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'H2 Heading',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'H3 Heading',
  },
}

export const H4: Story = {
  args: {
    as: 'h4',
    children: 'H4 Heading',
  },
}

export const H5: Story = {
  args: {
    as: 'h5',
    children: 'H5 Heading',
  },
}

export const H6: Story = {
  args: {
    as: 'h6',
    children: 'H6 Heading',
  },
}

// 사용자 정의 클래스 예시
export const WithCustomClass: Story = {
  args: {
    as: 'h2',
    className: 'text-blue-500 font-bold italic',
    children: 'Custom Styled Heading',
  },
}

// 복잡한 자식 요소를 가진 예시
export const WithComplexChildren: Story = {
  render: () => (
    <Heading as="h1">
      Advanced Heading with <span className="text-blue-500">colored</span> text
      and <code className="bg-gray-200 px-1 rounded">code</code>
    </Heading>
  ),
}

// 이벤트 핸들러 예시
export const WithEventHandler: Story = {
  args: {
    as: 'h1',
  },

  render: () => (
    <Heading
      as="h3"
      onClick={() => alert('Heading clicked!')}
      className="cursor-pointer hover:text-blue-500 transition-colors"
    >
      Click me
    </Heading>
  ),
}

// 모든 헤딩 레벨 비교
export const AllHeadingLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading as="h1">H1 Heading</Heading>
      <Heading as="h2">H2 Heading</Heading>
      <Heading as="h3">H3 Heading</Heading>
      <Heading as="h4">H4 Heading</Heading>
      <Heading as="h5">H5 Heading</Heading>
      <Heading as="h6">H6 Heading</Heading>
      <Heading as="p">Paragraph Text</Heading>
    </div>
  ),
}
