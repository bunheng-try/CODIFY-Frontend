// mockData.ts - Sample data for testing

export interface MockChallenge {
  id: number
  title: string
  description: string
  startCode: string
  testCases: MockTestCase[]
}

export interface MockTestCase {
  id: number
  input: string
  expectedOutput: string
}

// Sample challenges
export const mockChallenges: MockChallenge[] = [
  {
    id: 1,
    title: "Array Memory Allocation",
    description: `Complete the code below by filling in the missing parts, to:
1. Allocate memory dynamically to store n integers
2. Read n integers into the allocated array
3. Reallocate memory to add space for m more integers
4. Read m more integers into the newly allocated space
5. Print all n + m integers, each on a new line
6. Free the allocated memory at the end`,
    startCode: `void main() {
  // TODO: Your code here
}`,
    testCases: [
      {
        id: 1,
        input: "5\n1 2 3 4 5",
        expectedOutput: "1\n2\n3\n4\n5"
      },
      {
        id: 2,
        input: "3\n10 20 30",
        expectedOutput: "10\n20\n30"
      }
    ]
  },
  {
    id: 2,
    title: "Find Largest Number",
    description: `Write a program to find the largest number in an array:
1. Read the size of the array
2. Read all elements
3. Find the maximum element
4. Print the maximum`,
    startCode: `void main() {
  // TODO: Your code here
}`,
    testCases: [
      {
        id: 3,
        input: "5\n3 7 2 9 1",
        expectedOutput: "9"
      }
    ]
  },
  {
    id: 3,
    title: "Reverse an Array",
    description: `Reverse an array in place:
1. Read array size
2. Read elements
3. Reverse the array
4. Print reversed array`,
    startCode: `void main() {
  // TODO: Your code here
}`,
    testCases: [
      {
        id: 4,
        input: "4\n1 2 3 4",
        expectedOutput: "4 3 2 1"
      }
    ]
  }
]

// Helper function to get a challenge by ID
export const getChallengeById = (id: number): MockChallenge | undefined => {
  return mockChallenges.find(challenge => challenge.id === id)
}