import { useState } from "react";

interface TestCase {
  id: string;
  input: string;
  output: string;
}

const ChallengeTestCaseTab = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  // Add new testcase
  const handleAdd = () => {
    const newCase: TestCase = {
      id: crypto.randomUUID(),
      input: "",
      output: "",
    };

    setTestCases([...testCases, newCase]);
  };

  // Delete testcase
  const handleDelete = (id: string) => {
    setTestCases(testCases.filter((tc) => tc.id !== id));
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-semibold">
            Test Cases
          </h3>
          <p className="text-xs text-gray-500">
            Define inputs and expected outputs for evaluation.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md"
        >
          + Add Test Case
        </button>
      </div>

      {/* Empty State */}
      {testCases.length === 0 && (
        <p className="text-gray-400 text-sm">
          No test cases yet. Click “Add Test Case”.
        </p>
      )}

      {/* Test Case List */}
      <div className="space-y-4">
        {testCases.map((tc, index) => (
          <div
            key={tc.id}
            className="border rounded-md p-4 space-y-3 bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <p className="font-medium text-sm">
                Test Case #{index + 1}
              </p>

              <button
                onClick={() => handleDelete(tc.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>

            {/* Input */}
            <textarea
              placeholder="Input"
              value={tc.input}
              className="w-full border rounded px-3 py-2 text-sm font-mono"
              rows={3}
              onChange={(e) => {
                const updated = testCases.map((item) =>
                  item.id === tc.id
                    ? { ...item, input: e.target.value }
                    : item
                );
                setTestCases(updated);
              }}
            />

            {/* Output */}
            <textarea
              placeholder="Expected Output"
              value={tc.output}
              className="w-full border rounded px-3 py-2 text-sm font-mono"
              rows={3}
              onChange={(e) => {
                const updated = testCases.map((item) =>
                  item.id === tc.id
                    ? { ...item, output: e.target.value }
                    : item
                );
                setTestCases(updated);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeTestCaseTab;
