import { useMemo } from "react";

export const useCharCountMap = (word: string | null) => {
    return useMemo(() => {
      if (word === null) {
        return {};
      }
      return word.split('').reduce<Record<string, number>>((total, char) => {
        if (!total.hasOwnProperty(char)) {
          total[char] = 1;
        } else {
          total[char] += 1;
        }
        return total;
      }, {});
    }, [word]);
  };
