import * as tf from "@tensorflow/tfjs-core";
import { Solenoid } from "./Solenoid";

const solenoid = new Solenoid(5, 8, 2);
const time_span = tf.range(0, 1, 0.01);

solenoid.getSpline(100);
