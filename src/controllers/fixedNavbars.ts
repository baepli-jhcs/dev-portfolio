let one: string = "/projects/rwd/0";

export const fixedNavbarsMap = {
  "/projects/rwd/0": true,
  "/projects/rwd/1": true,
};

export const fixedNavbars = new Map<string, boolean>(
  Object.entries(fixedNavbarsMap)
);
