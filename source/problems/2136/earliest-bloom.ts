function earliestFullBloom(plantTime: number[], growTime: number[]): number {
  const totalPlantTime = plantTime.reduce((acc, cur) => {
    return acc + cur;
  });

  const sortedIndex = growTime
    .map((a, i) => [a, i])
    .sort(([a], [b]) => a - b)
    .map(([_val, i]) => i);

  const minTime = growTime[sortedIndex[0]] + totalPlantTime;
  let optimalTime = minTime;

  let remainingPlantTime = totalPlantTime - plantTime[sortedIndex[0]];

  sortedIndex.slice(1).forEach((i) => {
    const plantGrown = remainingPlantTime + growTime[i];
    if (plantGrown > optimalTime) {
      optimalTime = plantGrown;
    }

    remainingPlantTime -= plantTime[i];
  });

  return optimalTime;
}

export { earliestFullBloom };
