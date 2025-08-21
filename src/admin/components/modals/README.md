# Modal Components

Reusable modal components for the admin panel including confirmation dialogs and alerts.

## Components

### 1. Modal
Base modal component with backdrop and header.

```tsx
import { Modal } from './components/modals';

<Modal isOpen={isOpen} onClose={onClose} title="Title" size="md">
  <p>Modal content goes here</p>
</Modal>
```

### 2. ConfirmationDialog
Confirmation dialog with different types (danger, warning, info).

```tsx
import { ConfirmationDialog } from './components/modals';

<ConfirmationDialog
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={handleConfirm}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  type="danger"
  confirmText="Delete"
  cancelText="Cancel"
  loading={isDeleting}
/>
```

### 3. Alert
Alert dialog for showing success, error, warning, or info messages.

```tsx
import { Alert } from './components/modals';

<Alert
  isOpen={isOpen}
  onClose={onClose}
  title="Success"
  message="Operation completed successfully!"
  type="success"
  buttonText="OK"
/>
```

## Custom Hooks

### useModal
Basic modal state management.

```tsx
import { useModal } from './hooks/useModal';

const { isOpen, openModal, closeModal } = useModal();
```

### useConfirmation
Manages confirmation dialog state.

```tsx
import { useConfirmation } from './hooks/useModal';

const { confirmationState, showConfirmation, hideConfirmation } = useConfirmation();

// Show confirmation
showConfirmation({
  title: 'Delete Project',
  message: 'Are you sure?',
  type: 'danger',
  onConfirm: () => deleteProject()
});
```

### useAlert
Manages alert dialog state.

```tsx
import { useAlert } from './hooks/useModal';

const { alertState, showAlert, hideAlert } = useAlert();

// Show alert
showAlert({
  title: 'Success',
  message: 'Project created successfully!',
  type: 'success'
});
```

## Example Usage

```tsx
import React from 'react';
import { ConfirmationDialog, Alert } from './components/modals';
import { useConfirmation, useAlert } from './hooks/useModal';

const MyComponent = () => {
  const { confirmationState, showConfirmation, hideConfirmation } = useConfirmation();
  const { alertState, showAlert, hideAlert } = useAlert();

  const handleDelete = (id: string) => {
    showConfirmation({
      title: 'Delete Item',
      message: 'This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        try {
          await deleteItem(id);
          hideConfirmation();
          showAlert({
            title: 'Success',
            message: 'Item deleted successfully!',
            type: 'success'
          });
        } catch (error) {
          hideConfirmation();
          showAlert({
            title: 'Error',
            message: 'Failed to delete item.',
            type: 'error'
          });
        }
      }
    });
  };

  return (
    <>
      <button onClick={() => handleDelete('123')}>
        Delete Item
      </button>

      <ConfirmationDialog
        isOpen={confirmationState.isOpen}
        onClose={hideConfirmation}
        onConfirm={confirmationState.onConfirm}
        title={confirmationState.title}
        message={confirmationState.message}
        type={confirmationState.type}
      />

      <Alert
        isOpen={alertState.isOpen}
        onClose={hideAlert}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />
    </>
  );
};
```

## Props

### Modal Props
- `isOpen: boolean` - Whether the modal is open
- `onClose: () => void` - Close handler
- `title: string` - Modal title
- `children: React.ReactNode` - Modal content
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Modal size

### ConfirmationDialog Props
- `isOpen: boolean` - Whether the dialog is open
- `onClose: () => void` - Close handler
- `onConfirm: () => void` - Confirm action handler
- `title: string` - Dialog title
- `message: string` - Confirmation message
- `confirmText?: string` - Confirm button text (default: 'Confirm')
- `cancelText?: string` - Cancel button text (default: 'Cancel')
- `type?: 'danger' | 'warning' | 'info'` - Dialog type (default: 'danger')
- `loading?: boolean` - Show loading state on confirm button

### Alert Props
- `isOpen: boolean` - Whether the alert is open
- `onClose: () => void` - Close handler
- `title: string` - Alert title
- `message: string` - Alert message
- `type: 'success' | 'error' | 'warning' | 'info'` - Alert type
- `buttonText?: string` - Button text (default: 'OK')
