const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

var query_string = window.location.search;
var params = new URLSearchParams(query_string);
var dates = params.get("dates");
const LETTERBOXD_ID = params.get("lttbxdID");
var listDates = JSON.parse(dates);
listDates.shift();

var freqDates = freqDates(listDates);
var maxFreq = getMaxFreq(freqDates);

const FIRST_YEAR = Math.min(listDates);
const LAST_YEAR = Math.max(listDates);
const CELL_HEIGHT = SCREEN_HEIGHT / maxFreq / 2;
const CELL_WIDTH = SCREEN_WIDTH / Object.keys(freqDates).length / 1.5;
const MIN_LEFT = SCREEN_WIDTH / 2 - (Object.keys(freqDates).length * CELL_WIDTH / 2);
const MIN_BOTTOM = SCREEN_HEIGHT / 2 - maxFreq * CELL_WIDTH ;

displayDates(freqDates);

function displayDates (freqDates) {
  
  // vert -> bleu
  // var r = 69, g = 177, b = 18;
  // var rInc = (0 - 69) / Object.keys(freqDates).length;
  // var gInc = (212 - 177) / Object.keys(freqDates).length;
  // var bInc = (255 - 18) / Object.keys(freqDates).length;
 
  // bleu -> violet
  // var r = 18, g = 18, b = 177;
  // var rInc = (231 - r) / Object.keys(freqDates).length;
  // var gInc = (0 - g) / Object.keys(freqDates).length;
  // var bInc = (255 - b) / Object.keys(freqDates).length;

  // violet -> rouge
  var r = 144, g = 45, b = 255;
  var rInc = (255 - r) / Object.keys(freqDates).length;
  var gInc = (0 - g) / Object.keys(freqDates).length;
  var bInc = (95 - b) / Object.keys(freqDates).length;


  let i = 0;
  for (let element in freqDates) {
    let li = document.createElement('li');   
    li.classList.add("date");
    li.id = element;
    li.style.left = MIN_LEFT + i * CELL_WIDTH + "px";
    li.style.bottom = MIN_BOTTOM + "px";
    li.style.width = CELL_WIDTH - 1 + "px";
    li.style.height = CELL_HEIGHT * freqDates[element] + "px";
    li.style.backgroundColor = "rgb(" + (r + rInc * i) + ',' + (g + gInc * i) + ',' + (b + bInc * i) + ")";
    li.onclick = function(){window.open("https://letterboxd.com/" + LETTERBOXD_ID + "/films/year/" + this.id + "/").focus()};

    document.getElementById("dateList").appendChild(li);

    let toolTip = document.createElement('span'); 
    toolTip.innerHTML = element + " (" + freqDates[element] + ")";
    toolTip.classList.add("tooltiptext");
    toolTip.style.bottom = (maxFreq + 1) * CELL_HEIGHT + "px";
    toolTip.style.backgroundColor = "rgba(" + (r + rInc * i) + ',' + (g + gInc * i) + ',' + (b + bInc * i) + ", 1)";
    toolTip.style.opacity = "1";
    document.getElementById(element).appendChild(toolTip);
    i++;
  }
}

function freqDates(list) {
  var freq = {};
  for (let i = 0; i < list.length; i++) {
    freq[list[i]] = (freq[list[i]] || 0) + 1;
  }

  let maxElement = list[0];
  let maxFreq = freq[maxElement];
  for (let element in freq) {
    if (freq[element] > maxFreq) {
      maxElement = element;
      maxFreq = freq[element];
    }
  }
  return freq;
}

function getMaxFreq(freq) {
  let maxFreq = 0;
  for (let element in freq) {
    if (freq[element] > maxFreq) {
      maxFreq = freq[element];
    }
  }
  return maxFreq;
}