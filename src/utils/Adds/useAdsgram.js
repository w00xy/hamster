import { useCallback, useEffect, useRef } from 'react';

export function useAdsgram({ blockId, onReward, onError }) {
  const AdControllerRef = useRef(undefined);

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({ blockId });
  }, [blockId]);

  return useCallback(async () => {
    if (AdControllerRef.current) {
      AdControllerRef.current
        .show()
        .then(() => {
          // user watch ad till the end
          onReward();
        })
        .catch((result) => {
          // user get error during playing ad or skip ad
          onError?.(result);
        });
    } else {
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram script not loaded',
      });
    }
  }, [onError, onReward]);
}
