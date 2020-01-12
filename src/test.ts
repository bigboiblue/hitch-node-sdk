//TODO: This is a temporary file, and will be removed in future versions

import { HitchInstance } from "../index";
// import { HitchInstance } from "hitch-sdk";

console.log("\n");

async function test(): Promise<void> {
    console.log("This is a test");
    const myApp = new HitchInstance("http://localhost", "MyApp");
    await myApp.ready();

    console.log(myApp.isEnabled("Some fLag"));
    console.log(myApp.isEnabled("Im oLd grEg"));
}

test();


console.log("\n");
