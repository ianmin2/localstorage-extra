# localstorage-extra

`localstorage-extra` is a utility module that extends the functionality of the browser's localStorage. It provides methods for setting, getting, updating, and manipulating data in localStorage.

## Installation

You can install `localstorage-extra` using npm or yarn.

Using npm:

```
npm install localstorage-extra
```

Using yarn:

```
yarn add localstorage-extra
```

## Usage

First, import the AppStorage class from the module:

```
import AppStorage from 'localstorage-extra';

```

## Basic Usage

Here's how you can use AppStorage to ` set`` and  `get`` values in localStorage:

```
// Set a value
AppStorage.set('user', { name: 'Alice', age: 30 });

// Get a value
const user = AppStorage.get('user');
console.log(user); // { name: 'Alice', age: 30 }

```

## Update and Delete

You can update and delete values using the `update` and `del` methods:

```
// Update a value
AppStorage.update('user', 'age', 31);

// Delete a value
AppStorage.del('user', 'age');

```

## Counting Values

You can `count` the number of values stored in localStorage:

```
const count = AppStorage.count('user'); // Number of values under 'user'
console.log(count); // 1
```

## Filtering Data

You can filter and retrieve data using the `getWhere` method:

```
const adults = AppStorage.getWhere('user', (data) => data.age >= 18);
console.log(adults); // Array of users aged 18 and above

// or

const Alice = AppStorage.getWhere('user', { name: 'Alice' });

```

## Counting Filtered Data

You can count filtered data using the `countWhere` method:

```
const adultCount = AppStorage.countWhere('user', (data) => data.age >= 18);
console.log(adultCount); // Number of users aged 18 and above

// or

const numberOfAlice = AppStorage.countWhere('user', { name: 'Alice' });

```
