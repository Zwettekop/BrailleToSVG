let btn = document.getElementById("btnConvert");
let iptVeld = document.getElementById("iptTekst");
let iptOutput = document.getElementById("iptBraille");
let svg = document.getElementById("svgBraille");
//⠇⠏⠤⠑⠂⠶
textToShape = {
    " ": " ",
    "a": "1",
    "b": "12",
    "c": "14",
    "d": "145",
    "e": "15",
    "f": "124",
    "g": "1245",
    "h": "125",
    "i": "24",
    "j": "245",
    "k": "13",
    "l": "123",
    "m": "134",
    "n": "1345",
    "o": "135",
    "p": "1234",
    "q": "12345",
    "r": "1235",
    "s": "234",
    "t": "2345",
    "u": "136",
    "v": "1236",
    "w": "2456",
    "x": "1346",
    "y": "13456",
    "z": "1356",
    "#": "3456",
    "1": "1",
    "2": "12",
    "3": "14",
    "4": "145",
    "5": "15",
    "6": "124",
    "7": "1245",
    "8": "125",
    "9": "24",
    "0": "245",
    ",": "2",
    ":": "25",
    ".": "256",
    "?": "236",
    "!": "235",
    "(": "5 126",
    ")": "5 345",
    "/": "456 34",
    "": "456 16",
    "-": "36"
}

textToBraille = {
    " ": " ",
    "a": "⠁",
    "b": "⠃",
    "c": "⠉",
    "d": "⠙",
    "e": "⠑",
    "f": "⠋",
    "g": "⠛",
    "h": "⠓",
    "i": "⠊",
    "j": "⠚",
    "k": "⠅",
    "l": "⠇",
    "m": "⠍",
    "n": "⠝",
    "o": "⠕",
    "p": "⠏",
    "q": "⠟",
    "r": "⠗",
    "s": "⠎",
    "t": "⠞",
    "u": "⠥",
    "v": "⠧",
    "w": "⠺",
    "x": "⠭",
    "y": "⠽",
    "z": "⠵",
    "#": "⠼",
    "1": "⠁",
    "2": "⠃",
    "3": "⠉",
    "4": "⠙",
    "5": "⠑",
    "6": "⠋",
    "7": "⠛",
    "8": "⠓",
    "9": "⠊",
    "0": "⠚",
    ",": "⠂",
    ":": "⠒",
    ".": "⠲",
    "?": "⠦",
    "!": "⠖",
    "(": "⠐⠣",
    ")": "⠐⠜",
    "/": "⠸⠌",
    "": "⠸⠡",
    "-": "⠤"
}

cleanInput();
iptVeld.onchange = cleanInput;
iptVeld.onkeyup = cleanInput;
iptVeld.onclick = cleanInput;
iptVeld.onpaste = cleanInput;

function cleanInput() {
    let invoer = iptVeld.value.toLowerCase();
    let res = "";
    for (let c of invoer) {
        if (textToBraille.hasOwnProperty(c))
            res += c;
    }
    console.log(res);
    generateBrailleTekst(res);
    generateSvg(res);
}

function generateBrailleTekst(invoer) {
    let res = "";
    for (let c of invoer)
        res += textToBraille[c];
    iptOutput.value = res;
}

function generateSvg(invoer) {
    svg.innerHTML = "";

    let x = 50;
    let y = 50;
    let dotSpacing = 25
    let letterSpacing = 60;
    let dotSize = 10;

    for (let c of invoer) {
        //console.log(`${c} => ${textToShape[c]}`);
        let shape = textToShape[c];
        //Draw character
        for (let dot of shape) {
            if (c === " ")
                break;
            dot = parseInt(dot);
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("fill", "black");
            let cx = dot > 3 ? dotSpacing : 0;
            let cy = ((dot - 1) % 3) * dotSpacing;
            circle.setAttribute("cx", x + cx);
            circle.setAttribute("cy", y + cy);
            circle.setAttribute("r", dotSize);
            svg.appendChild(circle);
        }

        x += letterSpacing;
    }
}

//Download button
document.getElementById("btnDownload").onclick = () => {
    const blob = new Blob([svg.outerHTML.toString()]);
    const element = document.createElement("a");
    element.download = "braille.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}
