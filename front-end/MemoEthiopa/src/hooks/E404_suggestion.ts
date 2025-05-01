// hooks/usePathSuggestion.js
import { useCallback } from 'react';

export function usePathSuggestion(validPaths:any) {
  const levenshtein = useCallback((a:any, b:any) => {
    const dp = Array(a.length + 1)
      .fill(null)
      .map(() => Array(b.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,        // deletion
          dp[i][j - 1] + 1,        // insertion
          dp[i - 1][j - 1] + cost  // substitution
        );
      }
    }

    return dp[a.length][b.length];
  }, []);

  const getSuggestion = useCallback((inputPath:string) => {
    let suggestion = '';
    let minDistance = Infinity;

    validPaths.forEach((path:string) => {
      const distance = levenshtein(inputPath, path);
      if (distance < minDistance) {
        minDistance = distance;
        suggestion = path;
      }
    });

    return suggestion;
  }, [levenshtein, validPaths]);

  return { getSuggestion };
}
