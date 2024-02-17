const crypto = require("crypto");

const { Readable, Writable, Transform } = require("stream");

//chunk.toString() => usamos porque vem como um buffer
const input = new Readable({
  read() {
    for (let i = 0; i < 1000000; i++) {
      this.push(crypto.randomUUID());
    }
    this.push(null);
  },
});

const toUpperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

const addHello = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString() + " Hello Word");
  },
});

const output = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
});

input.pipe(toUpperCase).pipe(addHello).pipe(output);

// pipe(): Este método é usado para conectar streams, criando um pipeline de processamento.
// Aqui, o stream input é conectado ao toUpperCase, que por sua vez é conectado ao addHello,
//     e finalmente ao output.Isso permite que os dados fluam através de cada transformação em sequência,
//         desde a geração dos UUIDs até a exibição dos dados transformados no console
