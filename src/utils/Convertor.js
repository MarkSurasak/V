import { Vector3 } from "three";

export const asVector3 = (tensor) => {
  return tensor
    .transpose()
    .arraySync()
    .map((item) => {
      return new Vector3(item[0], item[1], item[2]);
    });
};

export const asVertices = (tensor) => {
  return tensor.transpose().flatten().arraySync();
};
