# localstorage-extra

A lightweight, type-safe utility module that extends the browser's localStorage with advanced data manipulation, querying, and filtering capabilities.

**Key Features:**
- **Zero runtime dependencies** - Only ~9.6KB compiled
- **Full TypeScript support** - Generics for complete type safety
- **Input validation** - Comprehensive error handling and validation
- **Modern API** - Intuitive methods with smart defaults
- **Flexible usage** - Both static and instance method support

## Installation

You can install `localstorage-extra` using npm or yarn:

```bash
npm install localstorage-extra
```

```bash
yarn add localstorage-extra
```

## Usage

Import the AppStorage class from the module:

```javascript
import AppStorage from 'localstorage-extra';
```

You can use AppStorage in two ways:

**Static methods (recommended):**
```javascript
AppStorage.set('user', { name: 'Alice', age: 30 });
const user = AppStorage.get('user');
```

**Instance methods:**
```javascript
const storage = new AppStorage();
storage.set('user', { name: 'Alice', age: 30 });
const user = storage.get('user');
```

## API Reference

### Basic Operations

#### `set(key, value)`
Store any data type in localStorage. Data is automatically serialized to JSON.

```javascript
AppStorage.set('user', { name: 'Alice', age: 30 });
AppStorage.set('todos', ['Buy milk', 'Walk dog']);
AppStorage.set('count', 42);
```

#### `get(key?, subKey?)`
Retrieve data from localStorage with flexible options:

```javascript
// Get specific key
const user = AppStorage.get('user');
console.log(user); // { name: 'Alice', age: 30 }

// Get nested property
const name = AppStorage.get('user', 'name');
console.log(name); // 'Alice'

// Get ALL localStorage data
const allData = AppStorage.get();
console.log(allData); // { user: {...}, todos: [...], count: 42 }
```

#### `update(key, subKey, value)`
Update nested properties within stored objects:

```javascript
AppStorage.update('user', 'age', 31);
AppStorage.update('user', 'address.city', 'New York'); // Deep nested updates
```

#### `del(key, subKey?)`
Delete entire keys or specific nested properties:

```javascript
// Delete entire key
AppStorage.del('user');

// Delete nested property
AppStorage.del('user', 'age'); // Properly removes the age property
```

#### `reset()`
Clear all localStorage data:

```javascript
AppStorage.reset(); // Clears everything
```

### Array Operations

#### `push(key, value)`
Add items to arrays stored in localStorage. Auto-creates arrays if key doesn't exist:

```javascript
// Creates new array if 'todos' doesn't exist
AppStorage.push('todos', 'Buy groceries');

// Adds to existing array
AppStorage.push('todos', 'Walk the dog');

console.log(AppStorage.get('todos')); // ['Buy groceries', 'Walk the dog']
```

#### `count(key, subKey?)`
Count items in arrays or properties in objects:

```javascript
const todoCount = AppStorage.count('todos'); // Returns array length
const userProps = AppStorage.count('user'); // Returns number of object properties
```

### Advanced Querying

#### `getWhere(key, filter, subKey?)`
Filter and retrieve data using custom functions or object matching:

```javascript
// Using custom filter function
const adults = AppStorage.getWhere('users', (users) => 
  users.filter(user => user.age >= 18)
);

// Using object matching
const alice = AppStorage.getWhere('users', { name: 'Alice' });

// Filter nested data
const expensiveItems = AppStorage.getWhere('shop', 
  item => item.price > 100, 
  'inventory'
);
```

#### `countWhere(key, filter, subKey?)`
Count items matching specific criteria:

```javascript
const adultCount = AppStorage.countWhere('users', 
  (users) => users.filter(user => user.age >= 18)
);

const aliceCount = AppStorage.countWhere('users', { name: 'Alice' });
```

#### `delWhere(key, filter, subKey?)`
Delete items matching specific criteria:

```javascript
// Remove all completed todos
AppStorage.delWhere('todos', { completed: true });

// Remove items using custom filter
AppStorage.delWhere('users', (users) => 
  users.filter(user => user.inactive)
);
```

## Error Handling

The library provides comprehensive input validation and meaningful error messages:

```javascript
try {
  AppStorage.set('', 'value'); // Invalid key
} catch (error) {
  console.log(error.message); // "AppStorage.set(): Key cannot be an empty string"
}

try {
  AppStorage.set(null, 'value'); // Invalid key type
} catch (error) {
  console.log(error.message); // "AppStorage.set(): Key cannot be null or undefined"
}

try {
  AppStorage.push('settings', null); // Invalid value
} catch (error) {
  console.log(error.message); // "AppStorage.push(): Value cannot be null or undefined"
}

try {
  AppStorage.push('user', 'new item'); // user is an object, not array
} catch (error) {
  console.log(error.message); // "AppStorage.push(): Value at key 'user' is not an array"
}

try {
  AppStorage.update('user', '', 'value'); // Invalid subkey
} catch (error) {
  console.log(error.message); // "AppStorage.update(): SubKey cannot be an empty string"
}
```

## TypeScript Support

Full TypeScript support with generics for enhanced type safety:

```typescript
import AppStorage, { IAppStorage } from 'localstorage-extra';

interface User {
  name: string;
  age: number;
}

// Type-safe operations with generics
const user = AppStorage.get<User>('user'); // Returns User | null
const users = AppStorage.get<User[]>('users'); // Returns User[] | null

// Backwards compatible - defaults to 'any'
const data = AppStorage.get('data'); // Returns any

// Type-safe array operations
AppStorage.set<User[]>('users', []);
AppStorage.push<User>('users', { name: 'Alice', age: 30 });

// Type-safe filtering
const adults = AppStorage.getWhere<User>('users', user => user.age >= 18);
```

## Bundle Size

Lightweight with zero runtime dependencies:
- **Production bundle**: ~9.6KB compiled
- **No lodash dependency** - uses optimized native implementations
- **Tree-shakeable** - import only what you need

### Storage Monitoring

Monitor localStorage usage and quotas:

```javascript
// Get current storage size in bytes
const bytes = AppStorage.size();
console.log(`Using ${bytes} bytes`);

// Get all localStorage keys
const allKeys = AppStorage.keys();
console.log('Stored keys:', allKeys);

// Get detailed usage information with browser quota detection
const usage = AppStorage.usage();
console.log(`Storage: ${usage.used}/${usage.total} bytes (${usage.percentage}%)`);
```

### Cross-Tab Communication

Listen for localStorage changes from other browser tabs:

```javascript
// Listen to all localStorage changes
const cleanup = AppStorage.onChange((key, oldValue, newValue) => {
  console.log(`${key} changed from`, oldValue, 'to', newValue);
});

// Listen to specific key changes only
const userCleanup = AppStorage.onChange('user', (key, oldValue, newValue) => {
  console.log('User data updated from another tab!');
  // Update UI, sync state, etc.
});

// Clean up event listeners when done
cleanup();
userCleanup();
```

### Async/Promise Support

Future-ready Promise-based API for async storage operations:

```javascript
// Promise-based operations
await AppStorage.setAsync('user', userData);
const user = await AppStorage.getAsync<User>('user');
await AppStorage.updateAsync('user', 'lastLogin', new Date());
await AppStorage.delAsync('user', 'tempData');

// Perfect for async/await workflows
async function saveUserPreferences(prefs) {
  try {
    await AppStorage.setAsync('preferences', prefs);
    console.log('Preferences saved successfully');
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
}
```

## Browser Compatibility

Works in all modern browsers that support localStorage. The library automatically detects browser storage quotas and caches the result for optimal performance.
