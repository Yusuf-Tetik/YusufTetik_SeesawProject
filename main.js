

const L = 400;
const HALF = L/2;

const plank = document.getElementById("plank");
const objectsLayer = document.getElementById("objectsLayer");

plank.addEventListener("click", (e)=> {
    const x= getLocalX(e);
    console.log("localX:", x);
});

function getLocalX(event) {
    const rect = plank.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    let localX =event.clientX - centerX;

    if(localX < -HALF){
        localX = -HALF;
    }
    if(localX > HALF) {
        localX = HALF;
    }
    return localX;
        
}