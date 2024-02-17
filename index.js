const fs = require("fs");
const { Readable, Transform } = require("stream");

const SEED_PATH = "./seed.txt";
const OUT_PATH = "./big-file.txt";

async function main() {
  await generateFile();
}

function generateFile() {
  return new Promise((resolve) => {
    const seed = fs.readFileSync(SEED_PATH, "utf8");
    const targetSize = Math.pow(1024, 3);
    const repetitions = Math.ceil(targetSize / seed.length);

    console.time("generating file");

    const generate = new Readable({
      read() {
        for (let i = 0; i < repetitions; i++) {
          this.push(seed);
        }
        this.push(null);
      },
    });

    const outFile = fs.createWriteStream(OUT_PATH);

    generate.pipe(outFile);
    generate.on("end", () => {
      console.time("generatinf file");
      resolve();
    });
  });
}

main();
