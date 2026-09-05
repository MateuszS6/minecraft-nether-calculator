const xInput = document.getElementById('x-input');
const yInput = document.getElementById('y-input');
const zInput = document.getElementById('z-input');
const conversion = document.getElementById('conversion');

const modeText = document.getElementById('mode-text');
const inputDimensionName = document.getElementById('input-dimension');
const outputDimensionName = document.getElementById('output-dimension');

const switchButton = document.getElementById('switch-button');
const clearButton = document.getElementById('clear-button');
const copyButton = document.getElementById('copy-button');

const overYMin = -62;
const overYMax = 316;
const netherYMin = 2;
const netherYMax = 123;

let isReversed = false;

function initConversionModule() {
    [xInput, yInput, zInput].forEach(input => {
        input.addEventListener('input', updateConversion);
    });

    switchButton.addEventListener('click', () => {
        isReversed = !isReversed

        // Update UI
        modeText.innerText = isReversed ? 'Nether to Overworld' : 'Overworld to Nether';
        inputDimensionName.innerText = isReversed ? 'Nether' : 'Overworld';
        outputDimensionName.innerText = isReversed ? 'Overworld' : 'Nether';

        updateYInputRange();
        updateConversion();
    });

    clearButton.addEventListener('click', () => {
        xInput.value = '';
        yInput.value = '';
        zInput.value = '';
        updateConversion();
    });

    copyButton.addEventListener('click', () => {
        const textToCopy = conversion.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Coordinates copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy coordinates.');
        });
    });

    updateYInputRange();
}

function clampNetherY(val) {
    return Math.min(123, Math.max(2, val));
}

function overworldToNether(x, y, z) {
    return {
        x: Math.floor(x / 8),
        y: clampNetherY(Math.floor(y)),
        z: Math.floor(z / 8)
    };
}

function netherToOverworld(x, y, z) {
    return {
        x: x * 8,
        y: y,
        z: z * 8
    };
}

function updateYInputRange() {
    yInput.min = isReversed ? netherYMin : overYMin;
    yInput.max = isReversed ? netherYMax : overYMax;
}

function updateConversion() {
    let x = parseInt(xInput.value);
    let y = parseInt(yInput.value);
    let z = parseInt(zInput.value);

    const coords = isReversed
        ? netherToOverworld(x, y, z)
        : overworldToNether(x, y, z);

    x = isNaN(coords.x) ? '~' : coords.x;
    y = isNaN(coords.y) ? '~' : coords.y;
    z = isNaN(coords.z) ? '~' : coords.z;

    conversion.innerText = `${x} ${y} ${z}`;
}