const keyChanger = {
  change(apiObject: Record<string, unknown>, keyPairs: Record<string, string>) {
    const changedApiObject: Record<string, unknown> = {};

    Object.entries(apiObject).forEach(([key, value]: [string, unknown]) => {
      keyPairs.hasOwnProperty(key)
        ? (changedApiObject[keyPairs[key]] = value)
        : (changedApiObject[key] = value);
    });

    return changedApiObject;
  },
};

export default keyChanger;
