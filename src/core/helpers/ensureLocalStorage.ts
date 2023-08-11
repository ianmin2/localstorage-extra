import localStorage from 'localStorage';

// Check if localStorage package is available
if (!window?.localStorage && !global?.localStorage) {
  if (!localStorage) {
    throw new Error(
      'localStorage is required to continue.\n run\t\t npm install localStorage --save '
    );
  } else {
    Object.assign(global, { localStorage });
  }
}
