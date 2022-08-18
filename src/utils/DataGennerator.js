import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

import { meshGrid3d } from "./LinearAlgebra";

export const gennerateDataChuck = (minPoint, maxPoint, density) => {
  const x_span = tf.linspace(minPoint.x, maxPoint.x, density);
  const y_span = tf.linspace(minPoint.y, maxPoint.y, density);
  const z_span = tf.linspace(minPoint.z, maxPoint.z, density);

  const [xx, yy, zz] = meshGrid3d(x_span, y_span, z_span);

  return tf.stack([xx.flatten(), yy.flatten(), zz.flatten()], 0);
};
