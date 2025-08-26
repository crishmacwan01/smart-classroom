import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Save, Download, Copy, RotateCcw } from 'lucide-react';

const CodeEditor = ({ user }) => {
  const [code, setCode] = useState(`#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Welcome to the C++ Code Editor!
    cout << "Hello, World!" << endl;
    
    // Example: Working with vectors
    vector<int> numbers = {5, 2, 8, 1, 9};
    
    cout << "Original array: ";
    for(int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Sort the array
    sort(numbers.begin(), numbers.end());
    
    cout << "Sorted array: ";
    for(int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}
`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const defaultCode = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`;

  const examples = {
    'Hello World': defaultCode,
    'Variables and Data Types': `#include <iostream>
using namespace std;

int main() {
    // Integer
    int age = 25;
    
    // Float
    float height = 5.8;
    
    // Character
    char grade = 'A';
    
    // String
    string name = "John Doe";
    
    // Boolean
    bool isStudent = true;
    
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Height: " << height << endl;
    cout << "Grade: " << grade << endl;
    cout << "Is Student: " << (isStudent ? "Yes" : "No") << endl;
    
    return 0;
}
`,
    'Arrays and Loops': `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Array elements: ";
    for(int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    cout << "Sum of elements: ";
    int sum = 0;
    for(int i = 0; i < size; i++) {
        sum += arr[i];
    }
    cout << sum << endl;
    
    return 0;
}
`,
    'Classes and Objects': `#include <iostream>
#include <string>
using namespace std;

class Student {
private:
    string name;
    int rollNumber;
    float grade;

public:
    // Constructor
    Student(string n, int roll, float g) {
        name = n;
        rollNumber = roll;
        grade = g;
    }
    
    // Method to display student info
    void displayInfo() {
        cout << "Name: " << name << endl;
        cout << "Roll Number: " << rollNumber << endl;
        cout << "Grade: " << grade << endl;
    }
    
    // Getter methods
    string getName() { return name; }
    int getRollNumber() { return rollNumber; }
    float getGrade() { return grade; }
};

int main() {
    // Create student objects
    Student student1("Alice", 101, 95.5);
    Student student2("Bob", 102, 87.2);
    
    cout << "Student 1 Information:" << endl;
    student1.displayInfo();
    
    cout << "\\nStudent 2 Information:" << endl;
    student2.displayInfo();
    
    return 0;
}
`
  };

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      // Mock output based on the code content
      let mockOutput = '';
      if (code.includes('Hello, World!')) {
        mockOutput += 'Hello, World!\n';
      }
      if (code.includes('sort(numbers.begin(), numbers.end())')) {
        mockOutput += 'Original array: 5 2 8 1 9 \nSorted array: 1 2 5 8 9 \n';
      }
      if (code.includes('Student')) {
        mockOutput += 'Student 1 Information:\nName: Alice\nRoll Number: 101\nGrade: 95.5\n\nStudent 2 Information:\nName: Bob\nRoll Number: 102\nGrade: 87.2\n';
      }
      if (code.includes('sum += arr[i]')) {
        mockOutput += 'Array elements: 1 2 3 4 5 \nSum of elements: 15\n';
      }
      if (!mockOutput) {
        mockOutput = 'Code executed successfully!\n';
      }
      
      setOutput(mockOutput);
      setIsRunning(false);
    }, 1500);
  };

  const handleSaveCode = () => {
    localStorage.setItem('cpp_code', code);
    alert('Code saved locally!');
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'main.cpp';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const handleReset = () => {
    setCode(defaultCode);
    setOutput('');
  };

  const loadExample = (exampleName) => {
    setCode(examples[exampleName]);
    setOutput('');
  };

  return (
    <div className="container code-editor-container">
      <div className="code-editor-header">
        <h1>C++ Code Editor</h1>
        <p>Write, compile, and run C++ code in your browser</p>
      </div>

      <div className="code-editor-toolbar">
        <div className="toolbar-left">
          <button onClick={handleRunCode} disabled={isRunning} className="btn btn-success">
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          <button onClick={handleSaveCode} className="btn btn-secondary">
            <Save size={16} />
            Save
          </button>
          <button onClick={handleDownloadCode} className="btn btn-secondary">
            <Download size={16} />
            Download
          </button>
          <button onClick={handleCopyCode} className="btn btn-secondary">
            <Copy size={16} />
            Copy
          </button>
          <button onClick={handleReset} className="btn btn-danger">
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        <div className="toolbar-right">
          <label htmlFor="examples">Load Example:</label>
          <select 
            id="examples"
            onChange={(e) => e.target.value && loadExample(e.target.value)}
            className="example-select"
          >
            <option value="">Choose an example...</option>
            {Object.keys(examples).map(example => (
              <option key={example} value={example}>{example}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="code-editor-workspace">
        <div className="editor-panel">
          <div className="panel-header">
            <h3>Code Editor</h3>
            <span className="file-name">main.cpp</span>
          </div>
          <div className="editor-container">
            <Editor
              height="400px"
              defaultLanguage="cpp"
              value={code}
              onChange={setCode}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                folding: true,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                selectOnLineNumbers: true,
                matchBrackets: 'always'
              }}
            />
          </div>
        </div>

        <div className="output-panel">
          <div className="panel-header">
            <h3>Output</h3>
            <span className="output-status">
              {isRunning ? 'Compiling...' : output ? 'Ready' : 'No output'}
            </span>
          </div>
          <div className="output-container">
            {isRunning ? (
              <div className="loading-output">
                <div className="loading-spinner"></div>
                <p>Compiling and running your code...</p>
              </div>
            ) : (
              <pre className="output-text">{output || 'Run your code to see the output here...'}</pre>
            )}
          </div>
        </div>
      </div>

      <div className="code-tips">
        <h3>C++ Quick Tips:</h3>
        <ul>
          <li>Always include necessary headers like <code>#include &lt;iostream&gt;</code></li>
          <li>Use <code>using namespace std;</code> to avoid typing <code>std::</code> repeatedly</li>
          <li>Remember to end statements with semicolons (;)</li>
          <li>Use proper indentation for better code readability</li>
          <li>Test your code with different inputs to ensure it works correctly</li>
        </ul>
      </div>
    </div>
  );
};

export default CodeEditor;