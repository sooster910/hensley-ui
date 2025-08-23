# @hensley-ui/react-simple-dialog

> Simple and intuitive Promise-based dialog component

A React dialog library that significantly improves upon ShadCN Dialog's convenience. Implement user confirmation dialogs with simple function calls without complex state management.

## 🌏 Language
- [한국어](README.kr.md)

## 🚀 Key Features

- **Promise-based API**: Handle user responses intuitively with `await` keyword
- **Imperative Approach**: Execute dialogs with simple function calls
- **Dynamic Content**: Freely configure titles, descriptions, button texts at runtime
- **Automated State Management**: All state management handled internally
- **Korean Support**: Built-in Korean button labels ("확인", "취소")
- **Full TypeScript Support**: Type safety guaranteed

## 📦 Installation

```bash
npm install @hensley-ui/react-simple-dialog
# or
pnpm add @hensley-ui/react-simple-dialog
```

## 🎯 Comparison with ShadCN Dialog

### ❌ Problems with ShadCN Dialog

```tsx
// Complex declarative structure
const [isOpen, setIsOpen] = useState(false)
const [title, setTitle] = useState("")
const [description, setDescription] = useState("")

const handleDelete = async () => {
  // Need to update states
  setTitle("Delete Confirmation")
  setDescription("Are you sure you want to delete?")
  setIsOpen(true)
  
  // Complex user response handling
  // Separate onConfirm, onCancel handlers needed
}

return (
  <>
    <Button onClick={handleDelete}>Delete</Button>
    
    {/* Must declare entire dialog structure in JSX */}
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            // Actual delete logic
            setIsOpen(false)
          }}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
)
```

### ✅ SimpleDialog's Convenience

```tsx
// Simple and intuitive imperative API
const openDialog = useSimpleDialog()

const handleDelete = async () => {
  const confirmed = await openDialog({
    title: "Delete Confirmation",
    description: "Are you sure you want to delete?",
    confirmButton: "Delete",
    cancelButton: "Cancel",
  })
  
  if (confirmed) {
    // Actual delete logic
    console.log("Deleted!")
  }
}

return <Button onClick={handleDelete}>Delete</Button>
```

### 🔄 Convenience Improvements

| Aspect | ShadCN Dialog | SimpleDialog |
|--------|---------------|--------------|
| **State Management** | Manual (useState, onOpenChange) | Automatic (handled internally) |
| **User Response Handling** | Complex (separate handlers) | Intuitive (Promise resolve) |
| **Dynamic Content** | Difficult (state updates) | Easy (pass as parameters) |
| **Code Length** | Long and complex | Short and concise |
| **JSX Structure** | Must be pre-declared | Not required |
| **Async Processing** | Callback-based | Promise-based |

## 🛠 Usage

### 1. Provider Setup

```tsx
import { SimpleDialogProvider } from '@hensley-ui/react-simple-dialog'

function App() {
  return (
    <SimpleDialogProvider>
      <YourApp />
    </SimpleDialogProvider>
  )
}
```

### 2. Basic Usage

```tsx
import { useSimpleDialog } from '@hensley-ui/react-simple-dialog'

function DeleteButton() {
  const openDialog = useSimpleDialog()

  const handleClick = async () => {
    const result = await openDialog({
      title: "Delete Confirmation",
      description: "Do you want to delete this item?",
      confirmButton: "Delete",
      cancelButton: "Cancel",
    })

    if (result) {
      console.log("User confirmed")
      // Execute delete logic
    } else {
      console.log("User cancelled")
    }
  }

  return <button onClick={handleClick}>Delete</button>
}
```

### 3. Custom Buttons

You can pass React elements instead of strings:

```tsx
const result = await openDialog({
  title: "Account Deletion",
  description: "This action cannot be undone.",
  confirmButton: <span style={{ color: 'red' }}>Permanently Delete</span>,
  cancelButton: <span>Cancel</span>,
})
```

## 📋 API Reference

### SimpleDialogType

```typescript
type SimpleDialogType = {
  title: string | ReactNode           // Dialog title
  description: string | ReactNode     // Dialog description
  confirmButton: string | ReactNode   // Confirm button (default: "확인")
  cancelButton: string | ReactNode    // Cancel button (default: "취소")
  onConfirm?: () => void             // Additional confirm callback (optional)
  onCancel?: () => void              // Additional cancel callback (optional)
}
```

### useSimpleDialog()

Returns a dialog opening function that returns a Promise.

**Return value**: `(props: SimpleDialogType) => Promise<boolean>`

- `true`: User clicked the confirm button
- `false`: User clicked the cancel button or closed the dialog

## 🌟 Use Cases

### Delete Confirmation

```tsx
const handleDelete = async () => {
  const confirmed = await openDialog({
    title: "Delete Item",
    description: "Do you want to delete the selected item?",
    confirmButton: "Delete",
    cancelButton: "Cancel",
  })

  if (confirmed) {
    await deleteItem(itemId)
    showSuccessMessage("Item deleted successfully")
  }
}
```

### Form Submission Confirmation

```tsx
const handleSubmit = async () => {
  const confirmed = await openDialog({
    title: "Submit Form",
    description: "Do you want to submit the form with the entered information?",
    confirmButton: "Submit",
    cancelButton: "Continue Editing",
  })

  if (confirmed) {
    await submitForm(formData)
    navigate('/success')
  }
}
```

### Logout Confirmation

```tsx
const handleLogout = async () => {
  const confirmed = await openDialog({
    title: "Logout",
    description: "Are you sure you want to logout?",
    confirmButton: "Logout",
    cancelButton: "Cancel",
  })

  if (confirmed) {
    await logout()
    navigate('/login')
  }
}
```

## 🎨 Styling

This component is built on TailwindCSS and ShadCN design system. You can customize styles by overriding CSS classes as needed.

## 🤝 Contributing

Feel free to submit issues for improvements or bug reports anytime.

## 📄 License

MIT License