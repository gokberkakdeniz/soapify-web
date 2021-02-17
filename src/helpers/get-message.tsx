const messages: Record<string, string> = {
  access_denied: "Authorization has been denied.",
};

const getMessage = (code: string): string =>
  code in messages ? messages[code] : code;

export default getMessage;
