export default function(elements, classToRm) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.contains(classToRm) &&
      elements[i].classList.remove(classToRm);
  }
}
