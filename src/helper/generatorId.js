const code = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split("");

function generatorId () {
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += code[Math.floor(Math.random() * code.length)];
  }
  return id;
}

export default generatorId;