

const L = 400;
const HALF = L/2;

const angleMAX = 30;
const K = 10;
const STORAGE_KEY= "seesaw-state";

const COLOR_BY_WEIGHT= {
    1: `#e0f2ff`, 2: `#bfe6ff`, 3: `#9fd9ff`, 4: `#7fcaff`, 5: `#5fb9ff`,
    6: `#7dd3a7`, 7: `#52b788`, 8: `#2c7da0`, 9: `#e76f51`, 10: `#c0392b`
};

const plank = document.getElementById("plank");
const objectsLayer = document.getElementById("objectsLayer");

const leftWeightE1= document.getElementById("leftWeight");
const rightWeightE1= document.getElementById("rightWeight");

const nextWeightE1= document.getElementById("nextWeight");
const angleInfoE1= document.getElementById("angleInfo");
const resetBtn= document.getElementById("resetBtn");


let objects= [];

let angleCurrent= 0;
let angleTarget= 0;
let rafId= null;

let nextWeight= randInt(1,10);

let lastAddedIndex= null;

const saved =loadState();
if(saved) {
    objects=saved.objects || [];
    angleCurrent = saved.angleCurrent || 0;
    angleTarget = saved.angleTarget || 0;
    nextWeight= saved.nextWeight || randInt(1,10);

    renderObjects();
    recalcPhysics();
    plank.style.transform= `rotate(${angleCurrent}deg)`;
    updateUIBadges();
}

plank.addEventListener("click", (e)=> {
    const x= getLocalX(e);
    console.log("localX:", x);

    const weight= nextWeight;
    objects.push({x, weight})

    nextWeight= randInt(1,10);

    lastAddedIndex= objects.length -1;

    renderObjects();
    recalcPhysics();
    startAnimationLoop();
    updateUIBadges();
    saveState();
});

resetBtn.addEventListener("click", () => {
    objects= [];
    angleCurrent= 0;
    angleTarget= 0;
    nextWeight= randInt(1,10);

    lastAddedIndex= null;

    renderObjects();
    recalcPhysics();
    plank.style.transform= "rotate(0deg)";
    updateUIBadges();
    localStorage.removeItem(STORAGE_KEY);
})

function renderObjects() {
    objectsLayer.innerHTML= "";
    objects.forEach((obj, index) => {
        const ce = document.createElement("div");
        ce.className="object";

        const size = 14 + obj.weight *3;
        ce.style.left= `${obj.x + HALF}px`;
        ce.style.width= `${size}px`;
        ce.style.height= `${size}px`;
        ce.style.background= COLOR_BY_WEIGHT[obj.weight];
        ce.textContent= obj.weight;
        
       if(lastAddedIndex !== null && index === lastAddedIndex) {
        ce.classList.add("falling")
        ce.addEventListener("animationend", () => {
            ce.classList.remove("falling");
       }, {once: true});
    }
        objectsLayer.appendChild(ce);
    });
    lastAddedIndex= null;
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
    angleTarget = clamp(rawAngle, -angleMAX, angleMAX);
}

function startAnimationLoop() {
    if(rafId != null) {
        return;
    }

    const EASING = 0.1;

    const step = () => {
        const diff =angleTarget - angleCurrent;

        if(Math.abs(diff)>0.001) {
            angleCurrent += diff * EASING;
            plank.style.transform= `rotate(${angleCurrent}deg)`;
            updateUIBadges();
            rafId = requestAnimationFrame(step);
        } else {
            angleCurrent = angleTarget;
            plank.style.transform= `rotate(${angleCurrent}deg)`;
            cancelAnimationFrame(rafId);
            rafId= null;
        }
    };

    rafId = requestAnimationFrame(step);
}

function updateUIBadges() {
    if(nextWeightE1) {
        nextWeightE1.textContent= nextWeight;
}
if(!angleInfoE1) {
    return;
}

const a = angleCurrent;
const deg = Math.abs(a).toFixed(1);
let text;

if(Math.abs(a) < 0.05) {
    text = "Düz (0°)";
} else if(a > 0) {
    text = `Sağa eğik (${deg}°)`;
} else {
    text = `Sola eğik (${deg}°)`;
}

angleInfoE1.textContent= text;
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

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


function randInt(min,max) {
    return Math.floor(Math.random()*(max-min +1)) + min;
}

function saveState() {
    try {
        const state = {
            objects,
            angleCurrent,
            angleTarget,
            nextWeight
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
}
function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}