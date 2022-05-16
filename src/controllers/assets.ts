import Asset from "../types/asset";

const assets: { [key: string]: [Asset] } = {
  "/": [
    {
      name: "background",
      type: "image",
      path: "https://api.bena.works/images/laptop.jpg",
    },
  ],
  "/about": [
    {
      name: "side",
      type: "image",
      path: "https://api.bena.works/images/Moose.jpg",
    },
  ],
  "/projects": [
    {
      name: "projects",
      type: "data",
      path: "https://api.bena.works/projects",
    },
  ],
};

export default assets;
