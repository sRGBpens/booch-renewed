let latRoutes = [];
let lonRoutes = [];
let eleRoutes = [];
let speedRoutes = [];

let j = 0;
let k = 0;

let alpha;

let files = ['data/route_2021-11-09_1.49pm.gpx',
  'data/route_2021-11-09_12.36pm.gpx',
  'data/route_2021-11-16_12.33pm.gpx',
  'data/route_2021-11-23_12.31pm.gpx',
  'data/route_2021-12-05_11.29am.gpx',
  'data/route_2021-12-11_6.27pm.gpx',
  'data/route_2021-12-21_1.10pm.gpx',
  'data/route_2021-12-25_7.11pm.gpx',
  'data/route_2021-12-26_5.14pm.gpx',
  'data/route_2021-12-26_11.43am.gpx',
  'data/route_2021-12-27_1.06pm.gpx',
  'data/route_2021-12-27_8.13am.gpx',
  'data/route_2021-12-27_9.42pm.gpx',
  'data/route_2021-12-28_3.50pm.gpx',
  'data/route_2021-12-28_9.12pm.gpx',
  'data/route_2021-12-29_8.52am.gpx',
  'data/route_2021-12-29_12.45pm.gpx',
  'data/route_2021-12-30_9.25am.gpx',
  'data/route_2021-12-30_10.31pm.gpx',
  'data/route_2021-12-31_6.24pm.gpx',
  'data/route_2022-01-01_5.19pm.gpx',
  'data/route_2022-01-03_8.27pm.gpx',
  'data/route_2022-01-08_7.04pm.gpx',
  'data/route_2022-01-10_8.28pm.gpx',
  'data/route_2022-01-17_3.25pm.gpx',
  'data/route_2022-01-17_12.20pm.gpx',
  'data/route_2022-01-19_8.01pm.gpx',
  'data/route_2022-01-21_6.21pm.gpx',
  'data/route_2022-01-23_6.27pm.gpx',
  'data/route_2022-01-28_6.11pm.gpx',
  'data/route_2022-01-29_6.20pm.gpx',
  'data/route_2022-01-31_9.50pm.gpx',
  'data/route_2022-02-04_6.02pm.gpx',
  'data/route_2022-02-12_4.15pm.gpx',
  'data/route_2022-02-16_1.51pm.gpx',
  'data/route_2022-02-19_6.04pm.gpx',
  'data/route_2022-02-21_4.41pm.gpx',
  'data/route_2022-02-26_8.03pm.gpx'];

// preload the data from the gpx files
function preload() {
  // get the latitude, longitutde, and speed from the .gpx files
  for (let i = 0; i < files.length; i++) {
    [latRoutes[i], lonRoutes[i], eleRoutes[i], speedRoutes[i]] = readGPX(files[i]);
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  console.log(lonRoutes);
  rectMode(CENTER);
  ellipseMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
}

function readGPX(file) {
  let latp = [];
  let lonp = [];
  let elep = [];
  let speedp = [];
  fetch(file)
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(doc => {
      const nodes = [...doc.getElementsByTagName('trkpt')];
      nodes.forEach(node => {
        latp.push(node.getAttribute("lat"));
        lonp.push(node.getAttribute("lon"));
      })
      const ele = doc.getElementsByTagName('ele');
      for (let i = 0; i < ele.length; i++) {
        elep.push(ele[i].innerHTML);
      }
      const speeds = doc.getElementsByTagName('speed');
      for (let i = 0; i < speeds.length; i++) {
        speedp.push(speeds[i].innerHTML);
      }
    })
  return [latp, lonp, elep, speedp]
}

function draw() {
  // noLoop();
  // fill(255);
  // for (let j = 0; j < lonRoutes.length; j++) {
  //   for (let k = 0; k < lonRoutes[j].length; k++) {
  let xm1 = map(lonRoutes[j][k], -119, -117.4, 0, width);
  let ym1 = map(latRoutes[j][k], 34.6, 33.5, 0, height);
  let ele = map(eleRoutes[j][k], 0, 1000, 0, height);
  let speed = (map(speedRoutes[j][k]), 0, 4, 0, .1));
  strokeWeight(speed);
  alpha = 10;
  stroke(map(ele, 0, 1000, 0, 360), 64, 100, alpha)
  line(xm1, ym1, xm1, ym1 - ele * .1);

  if (j <= lonRoutes.length) {
    k++;
    if (k == lonRoutes[j].length) {
      if (j < lonRoutes.length) {
        j++;
        k = 0;
      }
    }
  }

  console.log(frameRate());
}
// }
// }
