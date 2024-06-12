import { HashMapWLLBuckets } from "./hashmap.js";

const map2 = new HashMapWLLBuckets(10); // project step #1
map2.set("name", "Alice"); // project step #2
map2.set("age", "12");
map2.set("hair color", "brown");
map2.set("eye color", "brown");
console.log(map2.get("name")); // Alice // project step #3
console.log(map2.has("age")); // true // project step #4
map2.remove("name"); // project step #5
console.log(map2.get("name")); // null
console.log(map2);
console.log(map2.length()); // 3 // project step #6
map2.clear(); // project step #7
console.log(map2);

// const map3 = new HashMapWLLBuckets(10);
map2.set("name", "Alice"); // project step #2
map2.set("age", "12");
map2.set("hair color", "brown");
map2.set("eye color", "brown");
console.log(map2);
console.log(map2.keys()); // [ 'age', 'hair color', 'name', 'eye color' ] // project step #8
console.log(map2.values()); // [ '12', 'brown', 'Alice', 'brown' ] // project step #9
console.log(map2.entries()); // [[ 'age', '12' ], [ 'hair color', 'brown' ], [ 'name', 'Alice' ], [ 'eye color', 'brown' ]] // project step #10
