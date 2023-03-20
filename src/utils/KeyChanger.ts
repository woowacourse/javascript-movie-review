const KeyChanger = {
  change<T>(apiObject: Record<string, unknown>, keyPairs: Record<string, string>): T {
    const changedApiObject: Record<string, unknown> = {};

    Object.entries(apiObject).forEach(([key, value]: [string, unknown]) => {
      keyPairs.hasOwnProperty(key)
        ? (changedApiObject[keyPairs[key]] = value)
        : (changedApiObject[key] = value);
    });

    return changedApiObject as T;
  },
};

export default KeyChanger;
