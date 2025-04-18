import { Button } from '@components/button'
import { useSimpleDialog } from '../useSimpleDialog'
import { SimpleDialogType } from '../SimpleDialog.types'

export const SimpleDialogDefaultExample = (
  props: Partial<SimpleDialogType>,
) => {
  const openModal = useSimpleDialog()

  const handleClick = async () => {
    const res = await openModal({
      title: '스토리북 확인',
      description: 'Promise resolve 되는지 확인',
      confirmButton: '확인',
      cancelButton: '취소',
      ...props,
    })
    if (res) {
      console.log('done')
    }
  }
  return <Button onClick={handleClick}>다이얼로그 열기</Button>
}
