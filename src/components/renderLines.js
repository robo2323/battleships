import $ from "../utils/$";
export default function() {
  const paper = $.id('paper-container');

  for (let i = 20; i < 820; i += 20) {
    const currentDivId = `line ${i}`;
    paper.innerHTML += `<div id='${currentDivId}'></div>`;
    const currentDiv = document.getElementById(currentDivId);
    currentDiv.style.position = 'relative';
    currentDiv.style.top = `${i}px`;
    currentDiv.style.height = '2px';
    currentDiv.style.width = '100%';
    currentDiv.style.backgroundColor = 'rgba(0,0,120,0.08';
    currentDiv.style.zIndex = '1';
  }
}
