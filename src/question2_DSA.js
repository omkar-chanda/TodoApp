function DSA2(nums, target) {
    // Error handling: Check if the input array has less than 2 elements
    if (nums.length < 2) {
      throw new Error("Array must contain at least two elements");
    }
  
    // Create a hash map to store the indices of elements
    const numMap = {};
  
    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
      const currentNum = nums[i];
      const complement = target - currentNum;
  
      // Check if the complement exists in the map
      if (numMap.hasOwnProperty(complement)) {
        // Return the indices of the two numbers
        return [numMap[complement], i];
      }
  
      // Otherwise, store the current number's index in the map
      numMap[currentNum] = i;
    }
  
    // Error handling: If no solution is found (although the problem guarantees one)
    throw new Error("No two sum solution exists");
  }
  
  const nums = [2, 7, 11, 15];
  const target = 9;
  try {
    const result = DSA2(nums, target);
    console.log(result); // Output: [0, 1]
  } catch (error) {
    console.error(error.message);
  }
  