import { print } from './screen.js'

print("Starting kernel....\n");

function brick_webpage() {
  while (true) {}
}

let sim = await WebAssembly.instantiateStreaming(fetch('support.wasm'));
print(`Creating system of 1 MB\n`);
sim.instance.exports.set_mem_size(1024 * 1024 * 1024);
fetch("kernel.bin").then(
  resp => {
    resp.body.getReader().read().then(
      data => {
        let mem = new Uint8Array(sim.instance.exports.memory.buffer);
        for (let i = 0; i < data.value.length; i++) mem[i] = data.value[i];
        if (sim.instance.exports.set_kernel(0, 2) != 0) {
           print("Invalid kernel magic");
           //brick_webpage();
        }
        else 
          print("Kernel was loaded successfully");
      }
    )
  }
);
sim.instance.exports.run_kernel();
/*fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent('https://localhost:2000/hello.c')}`)
                    .then(response => {
                      if (!response.ok)
                        throw new Error('Network response was not ok.')
                      console.log(response.body.getReader().read().then(data => console.log(new TextDecoder().decode(data.value))));
                    }) */