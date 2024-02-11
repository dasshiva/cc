let screen = document.getElementById("mainscreen");

let looks = {
    lines : screen.clientHeight / 15,
    current : 0
};

export function print(text) {
    if (looks.lines > looks.current) {
        screen.value += text;
        looks.current++;
    }
    else {
        screen.scroll(screen.clientWidth, screen.clientHeight);
        screen.value += text;
        looks.current++;
    }
    console.log(looks);
}