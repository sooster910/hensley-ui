import { Meta, StoryObj } from '@storybook/react'
import {
  SimpleDialogDefaultExample,
  SimpleDialogWithCustomContentsExample,
} from './examples'
import { SimpleDialogProvider } from '../SimpleDialog'

const meta: Meta = {
  title: 'Components/Dialog/SimpleDialog',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <SimpleDialogProvider>
      <SimpleDialogDefaultExample />
    </SimpleDialogProvider>
  ),
}

// export const DialogWithCustomContents: Story = {
//   render: () => (
//     <SimpleDialogProvider>
//       <SimpleDialogWithCustomContentsExample />
//     </SimpleDialogProvider>
//   ),
// }
