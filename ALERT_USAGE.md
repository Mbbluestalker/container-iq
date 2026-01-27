# Custom Alert Component Usage

## Overview
The custom alert system provides toast-style notifications that appear at the top-right of the screen with automatic dismissal and smooth animations.

## Features
- 4 types: success, error, warning, info
- Auto-dismiss with configurable duration
- Manual close button
- Smooth slide-in animation
- Stacks multiple alerts
- Consistent brand styling

## How to Use

### 1. Import the hook
```javascript
import { useAlert } from '../context/AlertContext';
```

### 2. Get the alert functions
```javascript
const { showSuccess, showError, showWarning, showInfo } = useAlert();
```

### 3. Call the functions
```javascript
// Success alert (green)
showSuccess('Operation completed successfully!');

// Error alert (red)
showError('Something went wrong!');

// Warning alert (yellow)
showWarning('Please check your input.');

// Info alert (blue)
showInfo('Here is some information.');

// Custom duration (default is 5000ms)
showSuccess('This will disappear in 3 seconds', 3000);

// Never auto-dismiss (user must close manually)
showError('Critical error!', null);
```

## Examples

### In API Calls
```javascript
const handleSubmit = async (data) => {
  try {
    const response = await apiCall(data).unwrap();
    showSuccess('Data saved successfully!');
  } catch (error) {
    showError(error?.data?.message || 'Failed to save data');
  }
};
```

### Form Validation
```javascript
const validateForm = () => {
  if (!formData.email) {
    showWarning('Email is required');
    return false;
  }
  return true;
};
```

### User Actions
```javascript
const handleDelete = async (id) => {
  try {
    await deleteItem(id).unwrap();
    showSuccess('Item deleted successfully');
  } catch (error) {
    showError('Failed to delete item');
  }
};
```

## Current Implementation
Already integrated in:
- **SignupPage**: Shows success/error alerts for all 3 signup steps
  - Step 1: Account creation
  - Step 2: Profile creation
  - Step 3: Organization creation with delayed redirect

## Customization
Edit `/src/components/common/Alert.jsx` to customize:
- Colors and styles
- Animation timing
- Icon designs
- Layout and positioning

Edit `/src/context/AlertContext.jsx` to:
- Change default duration
- Modify alert positioning
- Add new alert types
- Change stacking behavior
