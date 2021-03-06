let colorsContainer = ls("#colors");
let menuColors = ls("#menu-colors");

let colors = {
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529",
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a",
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d",
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c",
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4",
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7",
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab",
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285",
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b",
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e",
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d",
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700",
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f",
  ],
};

let colorSection, colorSectionTitle;
for (let color in colors) {
  menuColors.innerHTML += `<li><a href="#${color}"><span class="badge-${color}"></span>${color}</a></li>`;

  colorsContainer.innerHTML += `
    <section>
      <h3 class="color-title" id="${color}">${color}</h3>
      <div class="color-group" data-color="${color}"></div>
    </section>`;

  colorSection = ls(`[data-color="${color}"]`);

  colorSectionTitle = color.toUpperCase();

  generateHTML(colorSectionTitle, colors[color], colorSection);
}

/* Insert HTML elements */
function generateHTML(colorName, colorArr, htmlEleColor) {
  colorArr.forEach((color, index) => {
    htmlEleColor.innerHTML += `
    <div class="color-c" title="Copy color ${color}">
      <div class="color-bg" id="${color}" style="background-color: ${color}"></div>
      <h4 class="color-name">${colorName} ${index + 1}</h4>
      <span class="color-type">${color}</span>
    </div>
  `;
  });
}

let btn = ls(".color-bg");

// Audio when click on color
let click = new Audio();
click.src = "stapler.mp3";

// Variables for the buttons and color-type options
const colorTypes = { 0: 'HEX#', 1: 'HEX', 2: 'RGB', 3: 'RGBA', 4: 'HSL', 5: 'HSLA' };
let colorType = colorTypes[0];
let formatButton = document.querySelector(".dropdown__btn");
let formatList = document.querySelector(".dropdown__content");
let formatTypeBtns = document.querySelectorAll(".dropdown__option");

// Opens/closes the options popup
function handleFormatsOpen() {
  formatList.classList.toggle("dropdown__content_visible");
}

// Changes the format type to be copied
function changeCopyFormat(evt) {
  colorType = colorTypes[evt.target.value];
  formatButton.textContent = `Copy Format: ${evt.target.textContent}`;
}

// Event listener for color format button
formatButton.addEventListener("click", handleFormatsOpen)
// This listener closes the popup if you click off of it
document.addEventListener("click", (evt) => {
  if (!evt.target.classList.contains("dropdown__btn") && formatList.classList.contains("dropdown__content_visible")) {
    handleFormatsOpen();
  }
});

// Adds listeners for all the color format options
formatTypeBtns.forEach((type) => {
  type.addEventListener("click", (evt) => {
    handleFormatsOpen()
    changeCopyFormat(evt);
  })
});

// This function computes the new formatted color value and returns it
function getColorFormatted(col) {
  let rgb;

  switch (colorType) {
    case 'HEX#':
      return col;
    case 'HEX':
      return col.slice(1);
    case 'RGB':
    case 'RGBA':
      rgb = col.slice(1).match(/../g);
      rgb = rgb.map((i) => parseInt(i,16));
      if (colorType === 'RGB') {
        return `(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      } else {
        return `(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1.0)`;
      }
    case 'HSL':
    case 'HSLA':
      rgb = col.slice(1).match(/../g);
      rgb = rgb.map((i) => parseInt(i,16)/255);
      let r = rgb[0], g = rgb[1], b = rgb[2];
      let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), h = 0, s = 0, l = 0;
      let delta = cmax - cmin;

      if (delta == 0) {
        h = 0;
      } else if (cmax == r) {
        h = ((g - b) / delta) % 6;
      } else if (cmax == g) {
        h = ((b - r) / delta) + 2;
      } else {
        h = ((r - g) / delta) + 4;
      }

      h = Math.round(h * 60);

      if (h < 0) {
        h += 360;
      }
      l = (cmax + cmin) / 2;
      s = delta == 0 ? 0 : (delta / (1 - Math.abs(2 * l - 1)));
      s = +(s * 100).toFixed(0);
      l = +(l * 100).toFixed(0);

      if (colorType === 'HSL') {
        return `(${h}, ${s}%, ${l}%)`;
      } else {
        return `(${h}, ${s}%, ${l}%, 1.0)`;
      }
  }
  return col;
}

btn.forEach((el) => {
  el.addEventListener("click", copyColor);
});

async function copyColor() {
  let color = getColorFormatted(this.getAttribute("id"));
  try {
    let title = ls("h2");
    title.innerText = color;
    title.classList.add("show");
    click.play();
    await navigator.clipboard.writeText(color);

    setTimeout(() => title.classList.remove("show"), 500);
  } catch (error) {}
}
