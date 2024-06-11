class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.listSize = 0;
    this.head = null;
  }

  size() {
    return this.listSize;
  }

  add(key, value) {
    // creates a new Node instance with the given key and value
    const newNode = new Node(key, value);

    // checks if the LinkedList instance is empty
    if (!this.head) {
      // if it is, sets the head of the list to be the newNode
      this.head = newNode;
    } else {
      // initializes current to point to the head of LinkedList instance, current will be used to traverse the LinkedList instance
      let current = this.head;

      // starts a while loop that continues as long as the current node has a next node
      while (current.next) {
        // checks if the key of the current node matches the key being added
        if (current.key === key) {
          // if it does, updates the value of the current node to the new value provided
          current.value = value;

          // exists function, and there was no need to add a new node
          return;
        }

        // moves to the next node in LinkedList instance
        current = current.next;
      }

      // after exiting the loop, checks if the key of the current node, which will be the last node, matches the key being added
      if (current.key === key) {
        // if it is, updates the value of the existing node
        current.value = value;
      } else {
        // if it isn't, adds the new node to the end of the LinkedList instance
        current.next = newNode;
        this.listSize++;
      }
    }
  }

  // retrieves a value for a given key
  get(key) {
    // initializes current to point to the head of LinkedList instance, current will be used to traverse the LinkedList instance
    let current = this.head;

    // starts a while loop that continues as long as the LinkedList instead has a current node
    while (current) {
      // checks if the key of the current node matches the key being retrieved
      if (current.key === key) {
        // if it does, return the value of the current node
        return current.value;
      }

      // otherwise, moves to the next node in LinkedList instance
      current = current.next;
    }

    // returns null if the key doesn't match any of the keys in the nodes of the LinkedList instance
    return null;
  }

  // removes a key-value pair
  remove(key) {
    // if the LinkedList instance is already empty, return null
    if (!this.head) return null;

    // if the key of the head node matches the key to be removed
    if (this.head.key === key) {
      // updates the head to point to the next node
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    /* traverse the list to find the node before the one to be removed
      starts a while loop that continues as long as the current node has a next node and as long as 
      the key of the next node doesn't match the key to be removed */
    while (current.next && current.next.key !== key) {
      // move to the next node in LinkedList instance
      current = current.next;
    }

    // after exiting the loop, checks if the next node exists, this means the key was found in the LinkedList instance
    if (current.next) {
      /* if the next node exists and matches the key to be removed, this line updates the next pointer of the current 
        node to skip the node to be removed, removing the node with the given key from the LinkedList */
      current.next = current.next.next;
      this.listSize--;
    }
  }
}

class HashMapWLLBuckets {
  constructor(size) {
    // size is the number of buckets in the hashmap
    this.size = size;

    // creates a new array with a length of size
    this.buckets = Array(size)
      // fills all elements in the array with null
      .fill(null)

      // initializes each bucket, replacing null with LinkedList
      .map(() => new LinkedList());
  }

  // Hash Function // project step #1
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    // returns the computed hash code
    return hashCode;
  }

  // Bucket Index Calculation
  getBucketIndex(key) {
    return Math.abs(this.hash(key)) % this.size;
  }

  // Adds a key-value pair to the hashmap // project step #2
  set(key, value) {
    const index = this.getBucketIndex(key);
    this.buckets[index].add(key, value);
  }

  // retrieves the value for a given key  // project step #3
  get(key) {
    const index = this.getBucketIndex(key);
    return this.buckets[index].get(key);
  }

  has(key) {
    const index = this.getBucketIndex(key);
    let returnValue = this.buckets[index].get(key);
    if (returnValue != null) {
      return true;
    } else {
      return false;
    }
  }

  // removes a key-value pair  // project step #5
  remove(key) {
    const index = this.getBucketIndex(key);
    this.buckets[index].remove(key);
  }

  length() {
    let numberOfNodes = 0;
    this.buckets.forEach((bucket) => {
      numberOfNodes += bucket.size();
    });
    return numberOfNodes;
  }
}

const map2 = new HashMapWLLBuckets(10);
map2.set("name", "Alice");
map2.set("age", "12");
map2.set("hair color", "brown");
map2.set("eye color", "brown");
console.log(map2.get("name")); // Alice
map2.remove("name");
console.log(map2.get("name")); // null
console.log(map2.has("age"));
map2.remove("eye color");
console.log(map2);

/* key is what my hash function will take as an input 
I access a bucket with the hash code */
