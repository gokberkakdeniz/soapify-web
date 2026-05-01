import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from "web-vitals";

type ReportCallback = (metric: Metric) => void;

const reportWebVitals = (onPerfEntry?: ReportCallback): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onINP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
