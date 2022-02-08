console.log("test");

let btn = document.getElementById("btnConvert");
let iptVeld = document.getElementById("iptTekst");
let iptOutput = document.getElementById("iptBraille");
let svg = document.getElementById("svgBraille");
//⠇⠏⠤⠑⠂⠶
textToShape = {
    "E": "15",
    "L": "123",
    "P": "1234",
    "-": "36",
    "1": "2",
    "7": "2356",
}

textToBraille = {
    "E": "⠑",
    "L": "⠇",
    "P": "⠏",
    "-": "⠤",
    "1": "⠂",
    "7": "⠶",
}

btn.onclick = () => {
    let invoer = iptVeld.value;
    console.log(iptVeld.value);
    let res = "";
    for (let c of invoer) {
        upper = c.toUpperCase();
        // if(textToShape)
        res += textToBraille[upper];
        //console.log(textToShape[c]);
    }
    iptOutput.value = res;
    console.log(iptOutput.value);
    generateSvg(iptVeld.value);
}

function generateSvg(invoer) {
    let res = "";

    let x = 50;
    let y = 50;
    let dotSpacing = 25
    let letterSpacing = 60;
    let dotSize = 10;

    for (let c of invoer) {
        upper = c.toUpperCase();
        // if(textToShape)
        //res += textToBraille[upper];
        let shape = textToShape[c];

        //Draw character
        for (let dot of shape) {
            dot = parseInt(dot);
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("fill", "black");
            let cx = dot > 3 ? dotSpacing : 0;
            let cy = ((dot - 1) % 3) * dotSpacing;
            circle.setAttribute("cx", x + cx);
            circle.setAttribute("cy", y + cy);
            circle.setAttribute("r", dotSize);
            svg.appendChild(circle);


            console.log(`${dot * 1} cx: ${cx}, cy: ${cy}`);

        }
        console.log("")
        //

        x += letterSpacing;
    }

    //iptOutput.value = res;
    console.log("done");
}

//Download button
document.getElementById("btnDownload").onclick = () => {
    console.log(svg);
    const blob = new Blob([svg.outerHTML.toString()]);
    const element = document.createElement("a");
    element.download = "braille.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}


fetch("braille.svg")
    .then((msg) => { console.log(msg); }); 