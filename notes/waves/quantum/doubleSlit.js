/*
https://www.famaf.unc.edu.ar/~gcas/cuantica1/frabboni12-young_e-.pdf
http://web.mit.edu/viz/EM/visualizations/notes/modules/guide14.pdf

add sliders for distance, width, wavelength
add button to emit electrons
  grow amplitude as electrons are emitted
  spawn all electrons on page load, or settings change
    make an array with the numbers 1-total electrons, and shuffle the array
      use the array decided which electrons are made visible on each emission
show concentric wave interference (like your other interference images)
  draw to the left of dots, but after double slit
  use checkbox, or move over?
add checkbox to block one of the slits
    only makes an interesting change for the laser-like pattern settings
*/

// function cycle() {
//     if (!stopTrainObserverLength) {
//         time += 0.5
//         lightLeft.setAttribute("r", time);
//         lightRight.setAttribute("r", Math.max(0, time - secondFlashTime));

//         if (time === secondFlashTime) lightRight.setAttribute("transform", "translate(" + (trainPos - 72) + ")");

//         trainPos += 0.25 // / 1.1547;
//         train.setAttribute("transform", "translate(" + (trainPos) + ") scale(0.866,1)");

//         if (time < 421) requestAnimationFrame(cycle);
//     }
// }
// requestAnimationFrame(cycle);

(function doubleSlit() {
    let offRight = 0;
    const svg = document.getElementById('double-slit'); //Get svg element
    const x = 335
    const xMag = 245
    const xMeasure = 130
    const height = 180

    // settings for electron-like patterns  (I think)
    // const step = 0.5 //1, 0.5, 0.25, 0.125, 0.0625 work for electron stacks
    // const amplitude = 600
    // const wavelength = 2;
    // const distance = 4;
    // const separation = 1;

    // settings for more laser-like patterns  (I think)
    // const step = 0.125 //1, 0.5, 0.25, 0.125, 0.0625 work for electron stacks
    // const amplitude = 400000
    // const wavelength = 0.01;
    // const distance = 200;
    // const separation = 0.2;

    // settings for more laser-like patterns  (I think)
    const step = 0.125 //1, 0.5, 0.25, 0.125, 0.0625 work for electron stacks
    const amplitude = 20000
    const wavelength = 0.45;
    const distance = 60;
    const separation = 1;


    d = `M ${x} -1`
    dMag = `M ${xMag} -1`
    for (let y = -1; y < height; y += step) {
        const yOff1 = height / 2 - y - separation
        const hyp1 = Math.sqrt(distance * distance + yOff1 * yOff1)
        const wave1 = amplitude * Math.sin(hyp1 / wavelength) / hyp1 / hyp1

        const yOff2 = height / 2 - y + separation
        const hyp2 = Math.sqrt(distance * distance + yOff2 * yOff2)
        const wave2 = amplitude * Math.sin(hyp2 / wavelength) / hyp2 / hyp2

        d += `L${x+wave1 + wave2} ${y}`
        dMag += `L${xMag+Math.abs(wave1 + wave2)} ${y}`

        //draw electron dots
        const count = Math.abs(wave1 + wave2) * 2
        if (y === Math.floor(y)) offRight = 0
        for (let i = 0; i < count; i++) {
            if (Math.random() < step * 0.75 && Math.random() < count) {
                //random hits
                var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                newElement.setAttribute("cx", xMeasure + 10 * Math.random());
                newElement.setAttribute("cy", y + (Math.random() - 0.5));
                newElement.setAttribute("r", "0.7");
                newElement.setAttribute("opacity", "0.4");
                newElement.style.fill = "#234";
                newElement.style.strokeWidth = "0px";
                svg.appendChild(newElement);
                //stacked and organized hits
                offRight++
                // var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                // newElement2.setAttribute("cx", xMeasure + 15 + offRight);
                // newElement2.setAttribute("cy", Math.floor(y));
                // newElement2.setAttribute("r", "0.35");
                var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                newElement2.setAttribute("x", xMeasure + 15 + offRight);
                newElement2.setAttribute("y", Math.floor(y));
                newElement2.setAttribute("width", "0.75");
                newElement2.setAttribute("height", "0.75");
                newElement2.style.fill = "#234";
                newElement2.style.strokeWidth = "0px";
                svg.appendChild(newElement2);
            }
        }
    }
    dMag += `L${xMag}, ${height}`
    document.getElementById("double-slit-wave-function").setAttribute("d", d);
    document.getElementById("double-slit-probability-function").setAttribute("d", dMag);




})()