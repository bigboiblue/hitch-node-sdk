"use strict";

//TODO: This is a temporary file, and will be removed in future versions
// import { HitchInstance } from "../index";
console.log("\n");

async function test() {
  console.log("This is a test");
  const myApp = new HitchInstance("http://localhost", "MyApp");
  await myApp.ready();
  console.log(myApp.isEnabled("Some fLag"));
  console.log(myApp.isEnabled("Im oLd grEg"));
}

test();
console.log("\n");

//# sourceMappingURL=test.js.map