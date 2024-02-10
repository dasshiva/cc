screen = document.getElementById("mainscreen")

const sleep = ms => new Promise(r => setTimeout(r, ms * 1000));

async function print() {
    screen.value += "Starting system, Hold on\n";
    await sleep(5);
    screen.scroll(screen.availWidth, screen.availHeight);
    screen.value += "What happens later\n";
    await sleep(5);
    screen.value += "What happens later\n";
    await sleep(5);
    screen.value += "What happens later\n";
    await sleep(5);
    screen.value += "What happens later\n";
}
console.log(screen.clientWidth, screen.clientHeight);
print()