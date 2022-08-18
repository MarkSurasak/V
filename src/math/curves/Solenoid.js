import { ParametricCurve } from "../ParametricCurve";

import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";
import { Vector3 } from "three";

class Solenoid extends ParametricCurve {
  constructor(radius, period, length) {
    super();

    this.radius = radius
    this.period = period
    this.length = length
  }

  getPointsTensor(t) {
    return tf.tidy(() => {
      const x = tf.sin(t.mul(2*Math.PI*this.period)).mul(this.radius)
      const y = tf.cos(t.mul(2*Math.PI*this.period)).mul(this.radius)
      const z = t.mul(this.length);

      return tf.stack([x, y, z], 0);
    })
  }

  getDerivativesTensor(t) {
    return tf.tidy(() => {
      const x = tf.sin(t.mul(2*Math.PI*this.period))
      const y = tf.cos(t.mul(2*Math.PI*this.period))
      const z = tf.fill([t.size,1], 1).flatten().mul(this.length);

      x.print(true)
      y.print(true)
      z.print(true)

      return tf.stack([x, y, z], 0);
    })
  }

  getPoint(t, optionalTerget = new Vector3()) {
    const x = this.radius*Math.cos(2*Math.PI*this.period*t)
    const y = this.radius*Math.sin(2*Math.PI*this.period*t)
    const z = this.length*t

    return optionalTerget.set(x,y,z)
  }

  getDerivative(t, optionalTerget = new Vector3()) {
    const x = this.radius*Math.sin(2*Math.PI*this.period*t)*2*Math.PI*this.period*-1
    const y = this.radius*Math.cos(2*Math.PI*this.period*t)*2*Math.PI*this.period
    const z = this.length

    return optionalTerget.set(x,y,z)
  }
}

export { Solenoid };
