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
    let table = new Map<string, any>();
    for (let asset of assets) {
      let promise;
      if (asset.type === "image") {
        promise = new Promise(async (resolve, reject) => {
          let image: string = await Loading.fetchImage(asset.path);
          table.set(asset.name, image);
          resolve(image);
        });
      } else if (asset.type === "data") {
        promise = new Promise(async (resolve, reject) => {
          let data: any = await Loading.fetchData(asset.path);
          table.set(asset.name, data);
          resolve(data);
        });
      }
      promises.push(promise);
    }
    try {
      await Promise.all(promises);
    } catch (e) {
      let result: any = await Loading.fetchAssets(assets);
      return result;
    }
    return table;
  };

  static fetchImage = async (path: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const reader = new FileReader();
      let data: any = "";
      try {
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
      } catch (error) {
        reject(error);
      }
    });
  };

  static fetchData = async (path: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(path);
        const projects = await response.json();
        resolve(projects);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default Loading;
