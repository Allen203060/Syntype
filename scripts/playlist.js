// Pre-Curated Learning Playlists

export const curatedPlaylists = {
  js_async: {
    id: "js_async",
    title: "JavaScript Async & Promises",
    language: "javascript",
    phases: [
      {
        phase_num: 1,
        title: "The Basic Promise Structure",
        snippet: "const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve('Data loaded!');\n  }, 1000);\n});",
        knowledge: "### The Promise Constructor\nA **Promise** represents the eventual completion (or failure) of an asynchronous operation.\n\n* **`resolve`**: Called when the operation succeeds.\n* **`reject`**: Called when it fails.\n* **`setTimeout`**: Simulates a network request taking 1 second."
      },
      {
        phase_num: 2,
        title: "Consuming a Promise (.then)",
        snippet: "myPromise\n  .then(data => console.log(data))\n  .catch(err => console.error(err));",
        knowledge: "### Consuming Promises\nOnce a promise is created, we use `.then()` to handle the successful `resolve` payload, and `.catch()` to handle any `reject` errors gracefully without crashing the app."
      },
      {
        phase_num: 3,
        title: "Modern Async/Await",
        snippet: "async function fetchUser() {\n  try {\n    const response = await fetch('/api/user');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch failed:', error);\n  }\n}",
        knowledge: "### Syntactic Sugar: Async/Await\n`async/await` is built on top of Promises. It makes asynchronous code look and behave a little more like synchronous code, making it much easier to read and maintain. The `try/catch` block replaces `.catch()`."
      }
    ]
  },
  dsa_trees: {
    id: "dsa_trees",
    title: "Mastering Trees: Inorder Traversal",
    language: "cpp",
    phases: [
      {
        phase_num: 1,
        title: "Defining the Tree Node",
        snippet: "struct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};",
        knowledge: "### Structuring Data in Memory\nIn C++, a Binary Tree node requires a value (`val`) and two pointers (`left`, `right`) that point to child nodes in memory. We initialize children to `NULL` to prevent segmentation faults."
      },
      {
        phase_num: 2,
        title: "Recursive Inorder Traversal",
        snippet: "void inorderTraversal(TreeNode* root) {\n    if (root == NULL) return;\n    \n    inorderTraversal(root->left);\n    std::cout << root->val << \" \";\n    inorderTraversal(root->right);\n}",
        knowledge: "### L-N-R (Left, Node, Right)\nInorder traversal on a Binary Search Tree (BST) visits nodes in **ascending sorted order**.\n\n**Time Complexity**: $O(N)$ because every node is visited exactly once.\n**Space Complexity**: $O(H)$ where $H$ is the height of the tree (due to the recursive call stack)."
      }
    ]
  }
};
