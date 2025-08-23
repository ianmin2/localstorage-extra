# localstorage-extra

A powerful utility module that extends the functionality of the browser's localStorage with advanced data manipulation, querying, and filtering capabilities.

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

The library provides meaningful error messages for common issues:

```javascript
try {
  AppStorage.push('settings', null); // Throws error
} catch (error) {
  console.log(error.message); // "AppStorage.push(): Value cannot be null or undefined"
}

try {
  AppStorage.push('user', 'new item'); // user is an object, not array
} catch (error) {
  console.log(error.message); // "AppStorage.push(): Value at key 'user' is not an array"
}
```

## TypeScript Support

Full TypeScript support with interfaces and type definitions:

```typescript
import AppStorage, { IAppStorage } from 'localstorage-extra';

interface User {
  name: string;
  age: number;
}

const user: User = AppStorage.get('user');
```

## Browser Compatibility

Works in all modern browsers that support localStorage. For Node.js environments, a localStorage polyfill is automatically detected and used if available.
