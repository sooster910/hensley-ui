import { Meta, StoryObj } from '@storybook/react'
import { SimpleDialogDefaultExample } from './examples'
import { SimpleDialogProvider } from '../SimpleDialog'
import { useSimpleDialog } from '../useSimpleDialog'
import { SimpleDialogType } from '../SimpleDialog.types'

const meta: Meta = {
  title: 'UI Component/SimpleDialog',
  component: SimpleDialogProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SimpleDialog는 사용자에게 확인이나 취소가 필요한 작업을 수행할 때 사용되는 다이얼로그 컴포넌트입니다.

## Features
- Promise 기반의 확인/취소 처리
- 커스텀 버튼 텍스트 지원
- React Element를 버튼으로 사용 가능
- 접근성 지원

## Usage
\`\`\`tsx
import { SimpleDialogProvider, useSimpleDialog } from '@components/simpleDialog'

const MyComponent = () => {
  const openDialog = useSimpleDialog()

  const handleClick = async () => {
    const confirmed = await openDialog({
      title: '삭제 확인',
      description: '정말 삭제하시겠습니까?',
      confirmButton: '삭제',
      cancelButton: '취소',
    })
    
    if (confirmed) {
      // 삭제 로직 실행
    }
  }

  return (
    <SimpleDialogProvider>
      <button onClick={handleClick}>삭제하기</button>
    </SimpleDialogProvider>
  )
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      description: '다이얼로그의 제목',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    description: {
      description: '다이얼로그의 설명',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    confirmButton: {
      description: '확인 버튼의 텍스트 또는 React Element',
      control: 'text',
      table: {
        type: { summary: 'string | ReactElement' },
        defaultValue: { summary: 'undefined' },
      },
    },
    cancelButton: {
      description: '취소 버튼의 텍스트 또는 React Element',
      control: 'text',
      table: {
        type: { summary: 'string | ReactElement' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onConfirm: {
      description: '확인 버튼 클릭 시 호출되는 콜백 함수',
      control: false,
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onCancel: {
      description: '취소 버튼 클릭 시 호출되는 콜백 함수',
      control: false,
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<SimpleDialogType>

export const Default: Story = {
  args: {
    title: '기본 다이얼로그',
    description: '이것은 기본 다이얼로그입니다.',
    confirmButton: '확인',
    cancelButton: '취소',
  },
  render: (args) => (
    <SimpleDialogProvider>
      <SimpleDialogDefaultExample {...args} />
    </SimpleDialogProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본적인 SimpleDialog 사용 예제입니다.',
      },
    },
  },
}

const App = (args: SimpleDialogType) => {
  const openModal = useSimpleDialog()

  const handleClick = async () => {
    const res = await openModal({
      ...args,
    })
    if (res) {
      console.log('done')
    }
  }

  return (
    <>
      <button onClick={handleClick}>버튼</button>
    </>
  )
}

export const PromiseTest: Story = {
  args: {
    title: '스토리북 확인',
    description: 'Promise resolve 되는지 확인',
    confirmButton: '확인',
    cancelButton: '취소',
  },
  render: (args) => (
    <SimpleDialogProvider>
      <App {...args} />
    </SimpleDialogProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Promise 기반의 확인/취소 처리를 보여주는 예제입니다.',
      },
    },
  },
}

export const CustomButton: Story = {
  args: {
    title: '커스텀 버튼',
    description: 'React Element를 버튼으로 사용할 수 있습니다.',
  },
  render: (args) => (
    <SimpleDialogProvider>
      <CustomButtonExample {...args} />
    </SimpleDialogProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '커스텀 버튼을 사용하는 예제입니다.',
      },
    },
  },
}

const CustomButtonExample = (args: SimpleDialogType) => {
  const openModal = useSimpleDialog()

  const handleClick = async () => {
    const res = await openModal({
      ...args,
      confirmButton: <span style={{ color: 'red' }}>삭제</span>,
      cancelButton: <span style={{ color: 'blue' }}>취소</span>,
    })
    if (res) {
      console.log('삭제됨')
    }
  }

  return (
    <>
      <button onClick={handleClick}>커스텀 버튼 다이얼로그</button>
    </>
  )
}
