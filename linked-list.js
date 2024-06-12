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

  // adds a new key value pair to LinkedList/bucket
  add(key, value) {
    // creates a new Node instance with the given key and value
    const newNode = new Node(key, value);

    // checks if the LinkedList instance is empty
    if (!this.head) {
      // if it is, sets the head of the list to be the newNode
      this.head = newNode;
      this.listSize++;
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

        // increments the listSize of the LinkedList/bucket
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

      // decrements the listSize of the LinkedList/bucket
      this.listSize--;
      return;
    }

    // assigns the head node to current
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

      // decrements the listSize of the LinkedList/bucket
      this.listSize--;
    }
  }

  // returns total number of nodes in LinkedList/bucket
  getListSize() {
    return this.listSize;
  }

  // returns all the keys in LinkedList/bucket
  getKeys() {
    // assigns the bucket's head node to current
    let current = this.head;

    // initializes an empty array
    let keys = [];

    // while current exists
    while (current) {
      // if the current node has a key
      if (current.key) {
        // push the key to the keys array
        keys.push(current.key);
      }

      // assigns the next node to current, traverses the LinkedList/bucket
      current = current.next;
    }

    // returns the keys array now filled up
    return keys;
  }

  // returns all the values in LinkedList/bucket
  getValues() {
    // assigns the bucket's head node to current
    let current = this.head;

    // initializes an empty array
    let values = [];

    // while current exists
    while (current) {
      // if the current node has a key
      if (current.value) {
        // push the key to the keys array
        values.push(current.value);
      }

      // assigns the next node to current, traverses the LinkedList/bucket
      current = current.next;
    }

    // returns the keys array now filled up
    return values;
  }

  // returns an array of all key-value pairs, each as an array (so an array of arrays)
  getEntries() {
    // assign the head node to current
    let current = this.head;

    // initializes an empty array
    let entries = [];

    // while current exists
    while (current) {
      // if the current node has a key and value
      if (current.key && current.value) {
        // assign the current node's key and value to array called entry
        let entry = [current.key, current.value];

        // push the entry to the entries array
        entries.push(entry);
      }

      // assigns the next node to current, traverses the LinkedList/bucket
      current = current.next;
    }

    // removes the second nested arrays
    entries = entries.flat();
    return entries;
  }
}

export { LinkedList };
