export const codeSnippets = {
    javascript: {
        short: [
            `const sum = (a, b) => a + b;`,
            `const numbers = [1, 2, 3].map(n => n * 2);`,
            `document.querySelector('.btn').addEventListener('click', e => e.preventDefault());`
        ],
        medium: [
            `async function fetchData(url) {\n  const res = await fetch(url);\n  const data = await res.json();\n  return data;\n}`,
            `const filterEven = (arr) => {\n  return arr.filter(num => num % 2 === 0);\n};`
        ],
        long: [
            `class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  on(event, listener) {\n    (this.events[event] = this.events[event] || []).push(listener);\n  }\n}`
        ]
    },
    python: {
        short: [
        `squares = [x**2 for x in range(10)]`,
        `def greet(name: str) -> str:\n    return f"Hello, {name}!"`
        ],
        medium: [
        `def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n    return -1`
        ],
        long: [
        `class Node:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next`
        ]
    },
  cpp: {
        short: [
        `std::cout << "Hello, Developer!" << std::endl;`,
        `std::vector<int> nums = {1, 2, 3, 4, 5};`
        ],
        medium: [
        `int main() {\n    std::vector<int> v = {3, 1, 4, 1, 5};\n    std::sort(v.begin(), v.end());\n    return 0;\n}`
        ],
        long: [
        `template <typename T>\nT add(T a, T b) {\n    return a + b;\n}`
        ]
    },
    java: {
        short: [
            `System.out.println("Hello, World!");`,
            `List<String> list = new ArrayList<>();`
        ],
        medium: [
            `public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(i);\n        }\n    }\n}`
        ],
        long: [
            `class Singleton {\n    private static Singleton instance;\n    private Singleton() {}\n    public static Singleton getInstance() {\n        if (instance == null) {\n            instance = new Singleton();\n        }\n        return instance;\n    }\n}`
        ]
    },
    rust: {
        short: [
            `let mut x = 5;`,
            `println!("Value: {}", x);`
        ],
        medium: [
            `fn main() {\n    let v = vec![1, 2, 3];\n    for i in &v {\n        println!("{}", i);\n    }\n}`
        ],
        long: [
            `struct Rectangle {\n    width: u32,\n    height: u32,\n}\nimpl Rectangle {\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n}`
        ]
    },
    c: {
        short: [
            `printf("Hello, World!\\n");`,
            `int *ptr = malloc(sizeof(int));`
        ],
        medium: [
            `#include <stdio.h>\nint main() {\n    int a = 10;\n    int b = 20;\n    printf("Sum: %d\\n", a + b);\n    return 0;\n}`
        ],
        long: [
            `typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;\n\nNode* createNode(int data) {\n    Node* newNode = (Node*)malloc(sizeof(Node));\n    newNode->data = data;\n    newNode->next = NULL;\n    return newNode;\n}`
        ]
    }
};