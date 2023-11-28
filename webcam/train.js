const video = document.getElementById("webcam");
const label = document.getElementById("label");

const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

// Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

function modelLoaded() {
    const earbudsBtn = document.getElementById("labelOne");
    const crochethookBtn = document.getElementById("labelTwo");
    // const bottleBtn = document.getElementById("labelThree");

    const trainbtn = document.getElementById("train");
    const saveBtn = document.getElementById("save");

    earbudsBtn.addEventListener("click", (event) => addImage(event, earbudsBtn));
    crochethookBtn.addEventListener("click", (event) => addImage(event, crochethookBtn));
    // bottleBtn.addEventListener("click", (event) => addImage(event, bottleBtn));

    trainbtn.addEventListener("click", (event) => train(event));
    saveBtn.addEventListener("click", (event) => saveModel(event));
}

function addImage(e, labelElement) {
    e.preventDefault();
    const label = labelElement.value;
    console.log(label);
    classifier.addImage(video, label);
}

let loaded = false

// Retrain the network
function train(e) {
    e.preventDefault()
    classifier.train((lossValue) => {
        console.log('Loss is', lossValue);
        loaded = true
    });
}

setInterval( () => {
    if (loaded) {
        classifier.classify(video, (err, result) => {
            console.log(result);
        })
    }
}, 1000);

// SaveModel function
function saveModel(e){
    e.preventDefault();
    featureExtractor.save();
}


label.innerText = "Ready when you are!";