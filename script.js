let btn = document.getElementById("btnConvert");
let iptText = document.getElementById("iptTekst");
let iptBraille = document.getElementById("iptBraille");
let svg = document.getElementById("svgBraille");
//⠇⠏⠤⠑⠂⠶
brailleToShape = { " ": " ", "⠁": "1", "⠃": "12", "⠉": "14", "⠙": "145", "⠑": "15", "⠋": "124", "⠛": "1245", "⠓": "125", "⠊": "24", "⠚": "245", "⠅": "13", "⠇": "123", "⠍": "134", "⠝": "1345", "⠕": "135", "⠏": "1234", "⠟": "12345", "⠗": "1235", "⠎": "234", "⠞": "2345", "⠥": "136", "⠧": "1236", "⠺": "2456", "⠭": "1346", "⠽": "13456", "⠵": "1356", "⠼": "3456", "⠁": "1", "⠃": "12", "⠉": "14", "⠙": "145", "⠑": "15", "⠋": "124", "⠛": "1245", "⠓": "125", "⠊": "24", "⠚": "245", "⠂": "2", "⠒": "25", "⠲": "256", "⠦": "236", "⠖": "235", "⠐⠣": "5 126", "⠐⠜": "5 345", "⠸⠌": "456 34", "⠸⠡": "456 16", "⠤": "36", };

textToBraille = { "a": "⠁", "b": "⠃", "c": "⠉", "d": "⠙", "e": "⠑", "f": "⠋", "g": "⠛", "h": "⠓", "i": "⠊", "j": "⠚", "k": "⠅", "l": "⠇", "m": "⠍", "n": "⠝", "o": "⠕", "p": "⠏", "q": "⠟", "r": "⠗", "s": "⠎", "t": "⠞", "u": "⠥", "v": "⠧", "w": "⠺", "x": "⠭", "y": "⠽", "z": "⠵", "#": "⠼", "1": "⠁", "2": "⠃", "3": "⠉", "4": "⠙", "5": "⠑", "6": "⠋", "7": "⠛", "8": "⠓", "9": "⠊", "0": "⠚", ",": "⠂", ":": "⠒", ".": "⠲", "?": "⠦", "!": "⠖", "(": "⠐⠣", ")": "⠐⠜", "/": "⠸⠌", "": "⠸⠡", "-": "⠤" };

//* Add event listeners
iptText.onchange = generateBrailleTekst;
iptText.onkeyup = generateBrailleTekst;
iptText.onclick = generateBrailleTekst;
iptText.onpaste = generateBrailleTekst;

iptBraille.onchange = generateSvg;
iptBraille.onkeyup = generateSvg;
iptBraille.onclick = generateSvg;
iptBraille.onpaste = generateSvg;

//* Add code
generateBrailleTekst();

function generateBrailleTekst() {
    //Clean input 
    let invoer = iptText.value.toLowerCase();
    let res = "";
    for (let c of invoer) {
        if (textToBraille.hasOwnProperty(c))
            res += c;
    }
    //console.log(res);
    //Translate
    invoer = res;
    res = "";
    for (let c of invoer)
        res += textToBraille[c];
    iptBraille.value = res;
    //! Not a great idea
    generateSvg();
}



function generateSvg() {
    //Clean input
    invoer = iptBraille.value;
    res = "";
    for (let c of invoer)
        if (brailleToShape.hasOwnProperty(c))
            res += c;

    invoer = res;
    //console.log(invoer);
    svg.innerHTML = "";

    let x = 50;
    let y = 50;
    let dotSpacing = 25
    let letterSpacing = 60;
    let dotSize = 10;

    for (let c of invoer) {
        //console.log(`${c} => ${textToShape[c]}`);
        let shape = brailleToShape[c];
        //Draw character
        for (let dot of shape) {
            if (c === " ")
                break;
            dot = parseInt(dot);
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("fill", "#6666FF");
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
