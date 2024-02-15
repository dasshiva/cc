const rows  = 30;
const cols = window.innerWidth / 9;
let t = document.getElementById("t1");
let kb_buffer = "", kb_disable = true;
function terminal_init() {
    for (let i = 0; i < rows; i++) {
        var r = t.insertRow(i);
        for (let j = 0; j < cols; j++) {
            var c = r.insertCell(j);
            c.innerText = '\xA0';
        }
    }
}

function terminal_putc(input, row, col) {
    if (input.length != 1 || typeof(input) != "string") return;
    if (row < 0 || col < 0 || row > rows || col > cols) return;
    t.rows[row].cells[col].innerText = input;
}

function put_in_kb() {
    let text = document.getElementById("input");
    console.log(text.value);
    let save = text.value;
    text.value = "";
    if (kb_disable) return;
    kb_buffer += save;
}

terminal_init()