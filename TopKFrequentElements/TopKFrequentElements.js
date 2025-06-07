const topKFrequent = (nums, k) => {
  const freqMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const buckets = Array(nums.length + 1)
    .fill()
    .map(() => []);
  const entries = Array.from(freqMap.entries());
  for (let i = 0; i < entries.length; i++) {
    const [num, freq] = entries[i];
    buckets[freq].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    for (let j = 0; j < buckets[i].length; j++) {
      result.push(buckets[i][j]);
      if (result.length === k) break;
    }
    if (result.length === k) break;
  }
  return result;
};

console.log(topKFrequent([1, 1, 1, 2, 2, 3, 3, 3, 3], 2));
