# Frontend Feature-Based Architecture

This frontend follows a feature-based architecture pattern, organizing code by business features rather than technical layers.

## Directory Structure

```
src/
├── features/                    # Feature modules
│   ├── authentication/         # User authentication
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   └── index.js            # Feature exports
│   ├── dashboard/              # Main dashboard
│   │   ├── components/
│   │   │   └── Dashboard.jsx
│   │   └── index.js
│   ├── items/                  # Lost & Found items
│   │   ├── components/
│   │   │   ├── cards/
│   │   │   │   ├── FoundItemCard.jsx
│   │   │   │   ├── LostItemCard.jsx
│   │   │   │   ├── ResolvedFoundItemCard.jsx
│   │   │   │   └── ResolvedLostItemCard.jsx
│   │   │   ├── ItemResolveModal.jsx
│   │   │   ├── ReportFoundItem.jsx
│   │   │   ├── ReportLostItem.jsx
│   │   │   └── ResolvedItemsList.jsx
│   │   └── index.js
│   ├── notifications/          # Notification system
│   │   ├── components/
│   │   │   ├── GeneralMessages.jsx
│   │   │   └── NotificationList.jsx
│   │   └── index.js
│   └── profile/               # User profile
│       ├── components/
│       │   ├── UserDetailCard.jsx
│       │   └── UserProfile.jsx
│       └── index.js
├── shared/                    # Shared resources
│   ├── assets/               # Images, sounds, etc.
│   ├── components/           # Reusable components
│   ├── context/             # React contexts
│   │   └── AppContext.jsx
│   ├── hooks/               # Custom hooks
│   │   └── useNotification.jsx
│   ├── styles/              # Global styles
│   │   ├── App.css
│   │   ├── Dashboard.css
│   │   ├── index.css
│   │   └── ItemCards.css
│   ├── utils/               # Utility functions
│   └── index.js             # Shared exports
└── main.jsx                 # Application entry point
```

## Benefits of Feature-Based Architecture

1. **Better Organization**: Code is organized by business features, making it easier to locate related functionality
2. **Scalability**: New features can be added as separate modules without affecting existing code
3. **Maintainability**: Changes to a feature are contained within its module
4. **Team Collaboration**: Different teams can work on different features independently
5. **Reusability**: Shared components and utilities are centralized

## Import Patterns

### Feature Imports
```javascript
// Clean feature-based imports
import { LoginForm, SignupForm } from './features/authentication';
import { Dashboard } from './features/dashboard';
import { FoundItemCard, LostItemCard } from './features/items';
```

### Shared Imports
```javascript
// Shared resources
import { AppContext, useNotification } from './shared';
```

## Component Naming Convention

Components have been renamed for better clarity:
- `Home.jsx` → `Dashboard.jsx`
- `Login.jsx` → `LoginForm.jsx`
- `Signup.jsx` → `SignupForm.jsx`
- `ProductF.jsx` → `FoundItemCard.jsx`
- `ProductL.jsx` → `LostItemCard.jsx`
- `Notestate.jsx` → `AppContext.jsx`

## File Organization Rules

1. Each feature has its own directory under `src/features/`
2. Components specific to a feature go in `features/{feature}/components/`
3. Shared components, hooks, and utilities go in `src/shared/`
4. Each feature exports its components through an `index.js` file
5. Styles are organized in `src/shared/styles/`
6. Assets are centralized in `src/shared/assets/`