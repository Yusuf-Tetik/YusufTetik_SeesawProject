

const L = 400;
const HALF = L/2;

const angleMAX = 30;
const K = 10;

const plank = document.getElementById("plank");
const objectsLayer = document.getElementById("objectsLayer");

const leftWeightE1= document.getElementById("leftWeight");
const rightWeightE1= document.getElementById("rightWeight");

let objects= [];

plank.addEventListener("click", (e)=> {
    const x= getLocalX(e);
    console.log("localX:", x);

    const weight= randInt(1,10);
    objects.push({x, weight})

    renderObjects();
    recalcPhysics();
});

function renderObjects() {
    objectsLayer.innerHTML= "";
    for(const obj of objects) {
        const ce = document.createElement("div");
        ce.className="object";

        const size = 14 + obj.weight *3;
        ce.style.left= `${obj.x + HALF}px`;
        ce.style.width= `${size}px`;
        ce.style.height= `${size}px`;
        ce.style.background= "orange";
        ce.textContent= obj.weight;
        
        ce.style.position= "absolute";
        ce.style.bottom= "100%";
        ce.style.transform= "translate(-50%, 0)";

        objectsLayer.appendChild(ce);

    }
}

function recalcPhysics() {
    let leftTorque= 0;
    let rightTorque= 0;
    let leftTotal= 0;
    let rightTotal= 0;

    for(const obj of objects) {
        const distance = Math.abs(obj.x);
        const torque = obj.weight * distance;  // Tork = ağırlık * mesafe

        const isLeftSide = obj.x < 0;
        if(isLeftSide) {
            leftTorque += torque;
            leftTotal += obj.weight;
        } else {
            rightTorque += torque;
            rightTotal += obj.weight;
        }
    }
    if (leftWeightE1) {
        leftWeightE1.textContent = leftTotal.toFixed(0);
    }
    if (rightWeightE1) {
        rightWeightE1.textContent = rightTotal.toFixed(0);
    }
    
    const rawAngle = (rightTorque - leftTorque) / K;
    const angleDeg = clamp(rawAngle, -angleMAX, angleMAX);
    plank.style.transform = `rotate(${angleDeg}deg)`;
}


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

function clamp(value, max, min) {
    return Math.max(max, Math.min(min, value));
}


function randInt(min,max) {
    return Math.floor(Math.random()*(max-min +1)) + min;
}