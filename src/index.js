const app = require('./app');

async function main() {
    await app.listen(process.env.PORT || 5000)

    //await app.listen(5000, '0.0.0.0');
    console.log('localhost:', 5000);
}

main();