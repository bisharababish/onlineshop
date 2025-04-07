export const generateOrderNumber = (): string => {
    return `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
  };
  