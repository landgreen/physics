/*
https://www.famaf.unc.edu.ar/~gcas/cuantica1/frabboni12-young_e-.pdf
http://web.mit.edu/viz/EM/visualizations/notes/modules/guide14.pdf



add button to emit electrons
    scale number of hits to the amplitude of the wave function
    automatically normalize the amplitude, of the wave function

show concentric wave interference (like your other interference images)
  draw to the left of dots, but after double slit
  use checkbox, or move over?

checkbox to block each slits
    only makes an interesting change for the laser-like pattern settings

checkbox to show the sum of two sine waves
*/

(function doubleSlit() {
    // const SVG = document.getElementById('double-slit'); //Get svg element
    const HITS = document.getElementById('double-slit-hits'); //Get svg element
    const x = 335
    const xMag = 245
    const xMeasure = 130
    const height = 150

    // settings for electron-like patterns  (I think)
    // const step = 0.5 //1, 0.5, 0.25, 0.125, 0.0625 work for electron stacks
    // const wavelength = 2;
    // const distance = 4;
    // const separation = 1;

    // settings for more laser-like patterns  (I think)
    // const step = 0.125 //1, 0.5, 0.25, 0.125, 0.0625 work for electron stacks
    // const wavelength = 0.01;
    // const distance = 200;
    // const separation = 0.2;

    // settings for more laser-like patterns  (I think)
    let step = 0.125 //1, 0.5, 0.25, 0.125, 0.0625 work for electron stacks
    let wavelength = 0.5 //0.515;
    let distance = 100;
    let separation = 2;

    const wave = {
        array: [],
        calculate() { //fill an array for each point on the wave function
            //solve for hypotenuse of right triangles that intersect the wall at different heights
            //right triangles are separated by the slit gap
            //use hypotenuse to find phase of sine wave (and add those phases for superposition)
            //account for 1/r2 rule at the end to show amplitude drop with distance (/hyp1 /hyp1)

            wavelength = Math.max(0.01, Number(document.getElementById("slit-wavelength").value))
            distance = Math.max(1, Number(document.getElementById("slit-distance").value))
            separation = Math.max(0.01, Number(document.getElementById("slit-separation").value))

            wave.emitIndex = 0;
            wave.stacks = [];
            wave.emissionOrder = [];
            wave.array = [];

            let amplitude = (distance * distance) * 15
            for (let y = 1; y < height - 1; y += step) {
                const yOff1 = height / 2 - y - separation
                const hyp1 = Math.sqrt(distance * distance + yOff1 * yOff1)
                const wave1 = amplitude * Math.sin(hyp1 / wavelength) / hyp1 / hyp1

                const yOff2 = height / 2 - y + separation
                const hyp2 = Math.sqrt(distance * distance + yOff2 * yOff2)
                const wave2 = amplitude * Math.sin(hyp2 / wavelength) / hyp2 / hyp2
                wave.array.push(wave1 + wave2)
                console.log(hyp1 === hyp2, hyp1, hyp2, yOff1, yOff2)

                const mag = Math.abs(wave1 + wave2)
                for (let i = 0; i < mag; i++) {
                    wave.emissionOrder.push(y)
                    wave.stacks.push(0)
                }
            }
            wave.emissionOrder = shuffle(wave.emissionOrder)
            //render
            wave.dWave = `M ${x} -1`
            wave.dMag = `M ${xMag} -1`
            for (let i = 0; i < wave.array.length; i++) {
                const y = i * step
                wave.dWave += `L${x+wave.array[i]} ${y}`
                wave.dMag += `L${xMag+Math.abs(wave.array[i])} ${y}`
            }
            wave.dMag += `L${xMag}, ${height-1}`
            document.getElementById("double-slit-wave-function").setAttribute("d", wave.dWave);
            document.getElementById("double-slit-probability-function").setAttribute("d", wave.dMag);
        },
        dWave: "",
        dMag: "",
        emitIndex: 0,
        emissionOrder: [],
        stacks: [],
        emit() { //draw an electron dot at a random 
            // const index = Math.floor(Math.random() * wave.emissionOrder.length)
            const y = wave.emissionOrder[wave.emitIndex]

            //random hits
            var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            newElement.setAttribute("cx", xMeasure + 10 * Math.random());
            newElement.setAttribute("cy", y + 0.1 * (Math.random() - 0.5));
            newElement.setAttribute("r", "0.6");
            newElement.setAttribute("opacity", "0.4");
            newElement.style.fill = "#234";
            newElement.style.strokeWidth = "0px";
            HITS.appendChild(newElement);
            //stacked and organized hits
            var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
            newElement2.setAttribute("x", xMeasure + 15 + 1 * wave.stacks[Math.floor(y)]);
            newElement2.setAttribute("y", Math.floor(y));
            newElement2.setAttribute("width", "0.75");
            newElement2.setAttribute("height", "0.75");
            newElement2.style.fill = "#234";
            newElement2.style.strokeWidth = "0px";
            HITS.appendChild(newElement2);

            wave.stacks[Math.floor(y)]++
            wave.emitIndex++
            if (wave.emitIndex > wave.emissionOrder.length) wave.emitIndex = 0 //restart cycling through the array if you get to the end
        }
    }

    document.getElementById("slit-distance").value = distance
    document.getElementById("slit-separation").value = separation
    document.getElementById("slit-wavelength").value = wavelength
    document.getElementById("slit-distance").addEventListener("change", wave.calculate);
    document.getElementById("slit-separation").addEventListener("change", wave.calculate);
    document.getElementById("slit-wavelength").addEventListener("change", wave.calculate);

    wave.calculate();

    HITS.innerHTML = "";
    for (let i = 0; i < 1500; i++) {
        wave.emit()
    }

    document.getElementById("emit").addEventListener("click", () => { //animate electron emission
        wave.calculate();
        HITS.innerHTML = "";
        let count = 0;
        requestAnimationFrame(cycle);

        function cycle() {
            if (count < 1500) {
                for (let i = 0; i < 10; i++) {
                    count++
                    wave.emit()
                }
                requestAnimationFrame(cycle);
            }
        }
    });
})()

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}