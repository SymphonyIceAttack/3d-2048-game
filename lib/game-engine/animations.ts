import { useRef } from "react";

interface MergeAnimation {
  isMerging: boolean;
  mergeValue: number;
  triggerMerge: (value: number) => void;
}

export function useMergeAnimation(): MergeAnimation {
  const isMerging = useRef(false);
  const mergeValue = useRef(0);

  const triggerMerge = (value: number) => {
    isMerging.current = true;
    mergeValue.current = value;

    setTimeout(() => {
      isMerging.current = false;
      mergeValue.current = 0;
    }, 600);
  };

  return {
    isMerging: isMerging.current,
    mergeValue: mergeValue.current,
    triggerMerge,
  };
}

interface PopAnimation {
  shouldPop: boolean;
  triggerPop: () => void;
}

export function usePopAnimation(): PopAnimation {
  const shouldPop = useRef(false);

  const triggerPop = () => {
    shouldPop.current = true;
    setTimeout(() => {
      shouldPop.current = false;
    }, 300);
  };

  return {
    shouldPop: shouldPop.current,
    triggerPop,
  };
}
