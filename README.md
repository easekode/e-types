# E-Types

A comprehensive TypeScript type definitions library for both backend and frontend applications, designed to provide consistent type safety across your entire stack.

## 📦 Installation

```bash
npm install @e-types/core
# or
yarn add @e-types/core
# or
pnpm add @e-types/core
```

## 🚀 Usage

### Import all types
```typescript
import * from '@e-types/core';
```

### Import specific type modules
```typescript
import { User, LoginRequest, AuthError } from '@e-types/core';
import { ApiResponse, PaginatedResponse } from '@e-types/core';
import { FileUploadRequest, ImageFile } from '@e-types/core';
```

### Import from specific modules
```typescript
// Authentication types
import type { User, AuthState, LoginRequest } from '@e-types/core/auth';

// API types
import type { ApiResponse, PaginationParams } from '@e-types/core/api';

// UI component types
import type { ButtonProps, ModalProps } from '@e-types/core/ui';
```

## 📚 Available Type Modules

### 🔐 Authentication (`auth.ts`)
- User management and profiles
- Login/registration flows
- JWT tokens and sessions
- OAuth integration
- Permission and role-based access

### 🌐 API (`api.ts`)
- HTTP request/response types
- Pagination and filtering
- Error handling
- File uploads
- Webhooks

### 🛠 Common (`common.ts`)
- Utility types
- TypeScript helper types
- Generic type transformations

### 🗄 Database (`database.ts`)
- Entity base types
- Query options
- Migration types
- Transaction handling
- Schema definitions

### ❌ Errors (`errors.ts`)
- Comprehensive error types
- Error handling patterns
- Client-side error tracking
- Error recovery strategies

### 📁 Files (`files.ts`)
- File upload/download
- Media metadata
- Image, video, audio types
- File permissions and sharing
- Cloud storage integration

### 🔔 Notifications (`notifications.ts`)
- Push notifications
- Email templates
- SMS messaging
- In-app notifications
- Notification campaigns

### 🎨 UI (`ui.ts`)
- React/React Native components
- Theme and styling
- Form validation
- Navigation types
- Accessibility

### ⚙️ Config (`config.ts`)
- Application configuration
- Environment variables
- Feature flags
- Integration settings

## 🎯 Key Features

### Type Safety
- Comprehensive type coverage for common application patterns
- Strict TypeScript configurations
- No `any` types used

### Framework Agnostic
- Works with React, React Native, Vue, Angular
- Backend framework independent
- Database ORM agnostic

### Modern Standards
- Latest TypeScript features
- ESM and CommonJS support
- Tree-shaking friendly

### Developer Experience
- Detailed JSDoc comments
- IDE autocomplete support
- Consistent naming conventions

## 📖 Examples

### User Authentication Flow
```typescript
import { User, LoginRequest, LoginResponse, AuthState } from '@e-types/core';

// Login function
async function login(request: LoginRequest): Promise<LoginResponse> {
  // Implementation
}

// Auth state management
const authState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  status: 'idle'
};
```

### API Response Handling
```typescript
import { ApiResponse, PaginatedResponse, User } from '@e-types/core';

// Single item response
const userResponse: ApiResponse<User> = await fetchUser(id);

// Paginated response
const usersResponse: PaginatedResponse<User> = await fetchUsers({
  page: 1,
  limit: 10,
  sort: 'createdAt',
  order: 'desc'
});
```

### File Upload
```typescript
import { FileUploadRequest, FileUploadResponse } from '@e-types/core';

const uploadRequest: FileUploadRequest = {
  file: selectedFile,
  folder: 'avatars',
  isPublic: true,
  generateThumbnails: true
};

const response: FileUploadResponse = await uploadFile(uploadRequest);
```

### UI Components
```typescript
import { ButtonProps, ModalProps } from '@e-types/core';

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  // Component implementation
};

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  size = 'md', 
  children 
}) => {
  // Modal implementation
};
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Packages

- [`@types/node`](https://www.npmjs.com/package/@types/node) - Node.js type definitions
- [`@types/react`](https://www.npmjs.com/package/@types/react) - React type definitions
- [`@types/react-native`](https://www.npmjs.com/package/@types/react-native) - React Native type definitions

## 📊 Package Stats

- **Zero dependencies** - Lightweight and fast
- **Tree-shakeable** - Import only what you need
- **TypeScript first** - Built with TypeScript, for TypeScript
- **Framework agnostic** - Use with any frontend/backend framework
