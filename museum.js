//for cards
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  
  // Event listener for the scroll event to check for elements in the viewport
  document.addEventListener('scroll', function () {
    document.querySelectorAll('.reveal').forEach(function (element) {
      if (isInViewport(element)) {
        element.classList.add('active');
      }
    });
  });

  //for trees
  function 
  isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Event listener for the scroll event to check for elements in the viewport
document.addEventListener('scroll', function () {
  document.querySelectorAll('.treereveal').forEach(function (element) {
    if (isInViewport(element)) {
      element.classList.add('active');
    }
  });
});