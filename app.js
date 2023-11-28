//variable for the prediction
const element = document.getElementById("imageClassified");
let synth = window.speechSynthesis

//speak the assignment
const assignment = document.getElementById('assignment');
assignment.addEventListener('click', () => {
    speak('take a picture of a crochethook or earbuds');
})

function startImageScan(){
    const classifier = ml5.imageClassifier('./model/model.json', './model/model.weights.bin');

    //classify uploaded image
    classifier.classify(document.getElementById("uploadedImage"), imageScanResult);
    element.innerHTML = "...";
}

async function imageScanResult(error, results) {
    if (error) {
        element.innerHTML = error;
    } else {
        let num = await results[0].confidence * 100;
        element.innerHTML = results[0].label + " Confidence: " + num.toFixed(0) + "%";
        speak(`You uploaded an image of ${results[0].label}`);
    }
}

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}