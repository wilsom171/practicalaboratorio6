const app = require('./app');

async function main() {
    await app.listen(5000, '0.0.0.0');
    console.log('localhost:', 5000);
}

main();