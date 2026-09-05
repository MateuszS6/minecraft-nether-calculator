const x1Input = document.getElementById('x1-input');
const y1Input = document.getElementById('y1-input');
const z1Input = document.getElementById('z1-input');
const x2Input = document.getElementById('x2-input');
const y2Input = document.getElementById('y2-input');
const z2Input = document.getElementById('z2-input');

const displacementResult = document.getElementById('displacement-result');
const followResult = document.getElementById('follow-result');
const distanceResult = document.getElementById('distance-result');

const clear1Button = document.getElementById('clear-1-button');
const clear2Button = document.getElementById('clear-2-button');

function initPathModule() {
    [x1Input, y1Input, z1Input, x2Input, y2Input, z2Input].forEach(input => {
        input.addEventListener('input', updatePathResult);
    });

    clear1Button.addEventListener('click', () => {
        x1Input.value = '';
        y1Input.value = '';
        z1Input.value = '';
        updatePathResult();
    });

    clear2Button.addEventListener('click', () => {
        x2Input.value = '';
        y2Input.value = '';
        z2Input.value = '';
        updatePathResult();
    });
}

function displacement({x1, y1, z1}, {x2, y2, z2}) {
    return {
        dx: x2 - x1,
        dy: y2 - y1,
        dz: z2 - z1
    };
}

function formatDisplacement({dx, dy, dz}) {
    const signed = (value) => value > 0 ? `+${value}` : value;
    return `${signed(dx)} ${signed(dy)} ${signed(dz)}`;
}

function distance({dx, dy, dz}) {
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function optimalPath({dx, dy, dz}) {
    const xDir = dx > 0 ? `${dx} East` : `${-dx} West`;
    const yDir = dy > 0 ? `${dy} Up` : `${-dy} Down`;
    const zDir = dz > 0 ? `${dz} South` : `${-dz} North`;

    const [first, second] = Math.abs(dx) >= Math.abs(dz) ? [xDir, zDir] : [zDir, xDir];

    return `${first}, ${second}, ${yDir}`;
}

function updatePathResult() {
    const x1 = parseInt(x1Input.value);
    const y1 = parseInt(y1Input.value);
    const z1 = parseInt(z1Input.value);
    const x2 = parseInt(x2Input.value);
    const y2 = parseInt(y2Input.value);
    const z2 = parseInt(z2Input.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) {
        displacementResult.innerText = '~ ~ ~';
        followResult.innerText = '~ ~ ~';
        distanceResult.innerText = '~';
        return;
    }

    const origin = {x1, y1, z1};
    const target = {x2, y2, z2};
    const d = displacement(origin, target);

    displacementResult.innerText = formatDisplacement(d);
    followResult.innerText = optimalPath(d);
    distanceResult.innerText = distance(d).toFixed(2);
}