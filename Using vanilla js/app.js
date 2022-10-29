//selectors

const imageInput = document.querySelector(".uploadImage");
const submitButton = document.querySelector(".submitButton");
const image = document.querySelector(".imageContainer");

//event listeners
imageInput.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      image.src = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});

submitButton.addEventListener("click", async function() {
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER});
    const poses = await detector.estimatePoses(image);
    console.log('Output:');
    console.log(poses[0].keypoints);
});





//functions

