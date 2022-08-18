export const runge_kutta_4_tensor = (
  func,
  time,
  current_state,
  delta_time = 0.01
) => {
  const f1 = func(time, current_state);
  const f2 = func(
    time + delta_time / 2,
    current_state.add(f1.mul(delta_time / 2))
  );
  const f3 = func(
    time + delta_time / 2,
    current_state.add(f2.mul(delta_time / 2))
  );
  const f4 = func(time + delta_time, current_state.add(f3.mul(delta_time)));

  const next_state = f1
    .add(f2.mul(2))
    .add(f3.mul(2))
    .add(f4)
    .mul(delta_time / 4)
    .add(current_state);

  return next_state;
};

export const runge_kutta_4 = (func, time, current_state, delta_time = 0.01) => {
  const f1 = func(time, current_state);
  const f2 = func(
    time + delta_time / 2,
    current_state.add(f1.multiplyScalar(delta_time / 2))
  );
  const f3 = func(
    time + delta_time / 2,
    current_state.add(f2.multiplyScalar(delta_time / 2))
  );
  const f4 = func(
    time + delta_time,
    current_state.add(f3.multiplyScalar(delta_time))
  );

  const average = f1
    .add(f2.multiplyScalar(2))
    .add(f3.multiplyScalar(2))
    .add(f4);

  const next_state = current_state.add(average.multiplyScalar(delta_time / 4));

  return next_state;
};

export const euler_medthod = (func, time, current_state, delta_time = 0.01) => {
  const next_state = func(time, current_state)
    .mul(delta_time)
    .add(current_state);

  return next_state;
};

export const computPhaseFlow = (
  func,
  initial_state,
  time_span,
  delta_time = 0.01,
  medthod = runge_kutta_4
) => {
  const history = [initial_state];

  let current_state = initial_state;
  for (let time of time_span) {
    const next_state = medthod(func, time, current_state, delta_time);

    history.push(next_state);
    current_state = next_state;
  }

  return history;
};
