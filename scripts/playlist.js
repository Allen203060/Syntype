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
  },
  lru_cache_py: {
    id: "lru_cache_py",
    title: "LRU Cache Implementation (Python)",
    language: "python",
    phases: [
      {
        phase_num: 1,
        title: "Node & Doubly Linked List",
        snippet: "class Node:\n    def __init__(self, key, val):\n        self.key, self.val = key, val\n        self.prev = self.next = None",
        knowledge: "### Doubly Linked List\nAn LRU Cache requires $O(1)$ time complexity for tracking usage. We use a Doubly Linked List because removing and inserting nodes in the middle of the list takes $O(1)$ time if we already have the node reference."
      },
      {
        phase_num: 2,
        title: "Cache Initialization",
        snippet: "class LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = {}  # Map key to node\n        \n        # Dummy head and tail\n        self.left, self.right = Node(0, 0), Node(0, 0)\n        self.left.next, self.right.prev = self.right, self.left",
        knowledge: "### Hash Map + Pointers\nThe `cache` dictionary gives us $O(1)$ lookup time. The dummy `left` (Least Recently Used) and `right` (Most Recently Used) nodes prevent edge-case null pointer errors when the list is empty."
      },
      {
        phase_num: 3,
        title: "Get Method",
        snippet: "    def get(self, key: int) -> int:\n        if key in self.cache:\n            self.remove(self.cache[key])\n            self.insert(self.cache[key])\n            return self.cache[key].val\n        return -1",
        knowledge: "### Accessing Data\nWhen a key is accessed via `get()`, it instantly becomes the **Most Recently Used** item. We achieve this by removing it from its current position in the linked list, and re-inserting it at the `right` (MRU) end."
      }
    ]
  },
  dfs_cpp: {
    id: "dfs_cpp",
    title: "Depth First Search (C++)",
    language: "cpp",
    phases: [
      {
        phase_num: 1,
        title: "Graph Representation",
        snippet: "unordered_map<int, vector<int>> adj;\nunordered_set<int> visited;",
        knowledge: "### Adjacency List\nWe represent the graph as a Hash Map where the key is the Node ID, and the value is a vector of neighboring Node IDs. We use an `unordered_set` to track visited nodes in $O(1)$ time to prevent infinite loops."
      },
      {
        phase_num: 2,
        title: "The DFS Algorithm",
        snippet: "void dfs(int node) {\n    if (visited.count(node)) return;\n    visited.insert(node);\n    cout << \"Visited: \" << node << endl;\n    \n    for (int neighbor : adj[node]) {\n        dfs(neighbor);\n    }\n}",
        knowledge: "### The Recursive Stack\nDFS plunges as deep as possible into the graph before backtracking. It relies heavily on the CPU's Call Stack. \n\n**Time Complexity**: $O(V + E)$ where $V$ is vertices and $E$ is edges."
      }
    ]
  },
  os_virtual_memory: {
    id: "os_virtual_memory",
    title: "OS: Virtual Memory Paging (C)",
    language: "c",
    phases: [
      {
        phase_num: 1,
        title: "Page Table Entry",
        snippet: "typedef struct {\n    unsigned int frame_number;\n    bool present_bit;\n    bool dirty_bit;\n    bool read_only;\n} PageTableEntry;",
        knowledge: "### Hardware Level Memory\nIn an OS, Virtual Memory is mapped to physical RAM frames using a Page Table. The `present_bit` tells the CPU if the page is currently in RAM. If it's `false`, a **Page Fault** occurs and the OS must load it from the hard drive."
      },
      {
        phase_num: 2,
        title: "Translating Addresses",
        snippet: "unsigned int translate_address(unsigned int virtual_address) {\n    unsigned int page_num = virtual_address >> 12;\n    unsigned int offset = virtual_address & 0xFFF;\n    \n    if (!page_table[page_num].present_bit) {\n        handle_page_fault(page_num);\n    }\n    \n    unsigned int frame = page_table[page_num].frame_number;\n    return (frame << 12) | offset;\n}",
        knowledge: "### Bitwise Operations\nAssuming a 4KB page size ($2^{12}$ bytes), the lower 12 bits represent the memory offset. We use bitwise right-shift `>> 12` to extract the Page Number, and bitwise AND `& 0xFFF` to extract the offset. Finally, we reconstruct the physical address."
      }
    ]
  }
};
