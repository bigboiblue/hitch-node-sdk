//TODO: This is a temporary file, and will be removed in future versions

import { HitchInstance, HitchEmitter } from "./index";

console.log("\n");

async function test() {
    console.log("This is a test");
    const myApp = new HitchInstance("http://localhost:8081", "MyApp");
    await myApp.ready();

    console.log(myApp.isEnabled("Some fLag"));
    console.log(myApp.isEnabled("Im oLd grEg"));
}

test().then().catch();


console.log("\n");
