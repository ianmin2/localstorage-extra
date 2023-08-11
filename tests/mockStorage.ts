Object.assign(global, {
  // Mocking localStorage
  localStorage: (() => {
    let store: { [key: string]: any } = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: any) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })(),
});
