(function () {
  "use strict";

  var root = document.documentElement;
  var reveals = document.querySelectorAll("[data-reveal]");

  if (reveals.length && "IntersectionObserver" in window) {
    root.className += " js";
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-in");
          io.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: "0px 0px -8% 0px" });

    for (var i = 0; i < reveals.length; i++) io.observe(reveals[i]);
  }

  var button = document.querySelector("[data-copy]");
  var code = document.querySelector(".bib-code code");

  if (button && code && navigator.clipboard) {
    button.hidden = false;
    var timer;
    button.addEventListener("click", function () {
      var label = button.querySelector("span") || button;
      navigator.clipboard.writeText(code.textContent).then(function () {
        label.textContent = "Copied";
        button.classList.add("is-done");
        clearTimeout(timer);
        timer = setTimeout(function () {
          label.textContent = "Copy";
          button.classList.remove("is-done");
        }, 1500);
      });
    });
  }
})();
