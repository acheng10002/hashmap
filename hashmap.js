import { LinkedList } from "./linked-list.js";

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
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }

    // returns the computed hash code
    return hashCode;
  }

  // Bucket Index Calculation
  getBucketIndex(key) {
    return this.hash(key);
    // return Math.abs(this.hash(key)) % this.size;
    // return Math.abs(this.hash(key));
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

  // returns true or false based on whether or not the key is in the hash map  // project step #4
  has(key) {
    return this.get(key) != null;
  }

  // removes a key-value pair  // project step #5
  remove(key) {
    const index = this.getBucketIndex(key);
    this.buckets[index].remove(key);
  }

  // returns number of stored keys in the hash map // project step #6
  length() {
    // reduce iterates over an array and accumulates a single value based on a callback
    return this.buckets.reduce(
      /* accumulator, count, starts at 0
         for each bucket in this.buckets, getListSize() is called to get the number of elements in the current bucket 
         the listSize of the current bucket is added to count
         count + bucket.getListSize(), callback accumulates the total number of elements across all buckets
         returns that total number
      */
      (count, bucket) => count + bucket.getListSize(),
      0
    );
  }

  // removes all entries in the hash map // project step #7
  clear() {
    this.buckets.forEach((bucket) => {
      /* setting bucket.head to null makes all nodes in the LinkedList unreachable and they
      will be garbage collected by JavaScript's runtime */
      bucket.head = null;
      bucket.listSize = 0;

      // implementation below is more complex than necessary
      // if (!bucket.head) {
      //   return null;
      // }
      // while (bucket.head) {
      //   bucket.head.value = null;
      //   bucket.listSize--;
      //   bucket.head = bucket.head.next;
      // }
    });
  }

  // returns an array containing all the keys inside the hash map // project step #8
  keys() {
    /* iterates through the array of LinkedLists/buckets to 
       get an array of the keys in each LinkedList/bucket 
       applies a mapping function to each key in the array and flattens the result by one level
     */
    return this.buckets.flatMap((bucket) => bucket.getKeys());
  }

  // returns an array containing all the values // project step #9
  values() {
    /* iterates through the array of LinkedLists/buckets to 
       get an array of the values in each LinkedList/bucket 
       applies a mapping function to each value in the array and flattens the result by one level
     */
    return this.buckets.flatMap((bucket) => bucket.getValues());
  }

  // returns an array that contains each key, value pair as an array // project step #10
  entries() {
    // initializes an empty array
    let allEntries = [];

    // iterates through the array of LinkedLists/buckets
    this.buckets.forEach((bucket) => {
      // returns all the entries in each LinkedList/bucket and assigns them to bucketEntries
      let bucketEntries = bucket.getEntries();

      // if the LinkedList actually has an entry or entries
      if (bucketEntries.length > 0) {
        // push the entries in each LinkedList/bucket into allEntries array
        allEntries.push(bucketEntries);
      }
    });
    return allEntries;
  }
}

export { HashMapWLLBuckets };
/* key is what my hash function will take as an input 
I access a bucket with the hash code */
