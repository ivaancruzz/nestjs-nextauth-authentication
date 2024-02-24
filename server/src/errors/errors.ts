const createErrorFactory = function (name: string) {
  return class BusinessError extends Error {
    constructor(message: string) {
      super(message);
      this.name = name;
      this.stack = '';
    }
  };
};

export const TokenError = createErrorFactory('ClientProviderError');
