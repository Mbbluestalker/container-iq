# Confirmation Modal

A reusable confirmation modal component with context provider for easy use throughout the application.

## Features

- Beautiful modal design with backdrop
- Three types: `danger`, `warning`, `info`
- Promise-based API for easy async/await usage
- Customizable title, message, and button text
- Keyboard accessible (ESC to close)
- Click outside to close

## Usage

### Basic Example

```javascript
import { useConfirm } from '../../context/ConfirmContext';

const MyComponent = () => {
  const { confirm } = useConfirm();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger', // 'danger', 'warning', or 'info'
    });

    if (confirmed) {
      // User clicked "Delete"
      // Proceed with deletion
    } else {
      // User clicked "Cancel" or closed modal
      // Do nothing
    }
  };

  return (
    <button onClick={handleDelete}>Delete Item</button>
  );
};
```

### Different Types

#### Danger (default)
Used for destructive actions like delete, deactivate, etc.
```javascript
await confirm({
  type: 'danger',
  title: 'Delete Account',
  message: 'This will permanently delete your account.',
});
```

#### Warning
Used for potentially risky actions that can be reversed.
```javascript
await confirm({
  type: 'warning',
  title: 'Archive Project',
  message: 'This will archive the project. You can restore it later.',
});
```

#### Info
Used for informational confirmations.
```javascript
await confirm({
  type: 'info',
  title: 'Proceed with Update',
  message: 'This will update all related records.',
});
```

### All Options

```javascript
const confirmed = await confirm({
  title: 'Confirm Action',              // Modal title
  message: 'Are you sure?',              // Modal message
  confirmText: 'Confirm',                // Confirm button text
  cancelText: 'Cancel',                  // Cancel button text
  type: 'danger',                        // 'danger', 'warning', 'info'
});
```

## Integration

The `ConfirmProvider` is already added to `main.jsx`, so you can use `useConfirm()` anywhere in your app.

## Direct Component Usage (Advanced)

If you need more control, you can also use the `ConfirmModal` component directly:

```javascript
import ConfirmModal from '../../components/common/ConfirmModal';

const [isOpen, setIsOpen] = useState(false);

<ConfirmModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={() => {
    // Handle confirmation
    setIsOpen(false);
  }}
  title="Custom Title"
  message="Custom message"
  confirmText="Yes"
  cancelText="No"
  type="danger"
/>
```
