import Asset from "../types/asset";

const assets: { [key: string]: [Asset] } = {
  "/": [
    {
      name: "background",
      type: "image",
      path: `${process.env.REACT_APP_API_URL}/images/Laptop.jpg`,
    },
  ],
  "/about": [
    {
      name: "side",
      type: "image",
      path: `${process.env.REACT_APP_API_URL}/images/Moose.jpg`,
    },
  ],
  "/projects": [
    {
      name: "projects",
      type: "data",
      path: `${process.env.REACT_APP_API_URL}/projects`,
    },
  ],
};

export default assets;
