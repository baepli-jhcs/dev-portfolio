import Asset from "../types/asset";
import assets from "./assets";

class Loading {
  static getRequiredAssets = (route: string): [Asset] | [] => {
    let pageAsssets = assets[route];
    if (pageAsssets) return pageAsssets;
    return [];
  };

  static fetchAssets = async (assets: [Asset]) => {
    let promises = [];
    let table = new Map<string, string>();
    for (let asset of assets) {
      if (asset.type === "image") {
        let promise: Promise<string> = new Promise(async (resolve, reject) => {
          let image: string = await Loading.fetchImage(asset.path);
          table.set(asset.name, image);
          resolve(image);
        });
        promises.push(promise);
      }
    }
    await Promise.all(promises);
    return table;
  };

  static fetchImage = async (path: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const reader = new FileReader();
      let data: any = "";
      const response = await fetch(path);
      const blob = await response.blob();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        data = reader.result;
        resolve(data);
      };
      reader.onerror = (error) => {
        reader.readAsDataURL(blob);
      };
    });
  };
}

export default Loading;
