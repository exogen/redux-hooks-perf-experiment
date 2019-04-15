import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { Provider } from "react-redux";
import { store, updateFoo, updateBar, updateBaz } from "../store";

export default function Benchmark({ children }) {
  const [mounted, setMounted] = useState(false);
  const benchmarkTimes = useRef([]);
  const [benchmarkStatus, setBenchmarkStatus] = useState("IDLE");

  // If you want to adjust the update count.
  const fooLoops = 1000;
  const barLoops = 1000;
  const bazLoops = 1000;

  const start = useCallback(async () => {
    setBenchmarkStatus("RUNNING");
    await true;
    for (let i = 0; i < fooLoops; i++) {
      store.dispatch(updateFoo(i));
    }
    for (let i = 0; i < barLoops; i++) {
      store.dispatch(updateBar(i));
    }
    for (let i = 0; i < bazLoops; i++) {
      store.dispatch(updateBaz(i));
    }
    await true;
    setBenchmarkStatus("DONE");
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(
    () => {
      const t = window.performance.now();
      if (benchmarkTimes.current.length) {
        const [prevStatus, prevTime] = benchmarkTimes.current[
          benchmarkTimes.current.length - 1
        ];
        const timeDelta = t - prevTime;
        console.log(`${benchmarkStatus} t = ${t} (+${timeDelta} ms)`);
      } else {
        console.log(`${benchmarkStatus} t = ${t}`);
      }
      benchmarkTimes.current.push([benchmarkStatus, t]);
    },
    [benchmarkStatus]
  );

  if (!mounted) {
    return null;
  }

  return (
    <Provider store={store}>
      <button onClick={start}>Benchmark</button>
      {children}
    </Provider>
  );
}
