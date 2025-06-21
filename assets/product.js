document.addEventListener("DOMContentLoaded", function () {
  const swiperContainer = document.querySelector(".product-section");

  if (!swiperContainer) return;

  // Swiper configuration with responsive breakpoints
  const slidesPerViewMobile = parseInt(swiperContainer.dataset.slidesPerViewMobile || "1");
  const slidesPerViewTablet = parseInt(swiperContainer.dataset.slidesPerViewTablet || "2");
  const slidesPerViewDesktop = parseInt(swiperContainer.dataset.slidesPerViewDesktop || "3");
  const spaceBetween = parseInt(swiperContainer.dataset.spaceBetween || "10");
  const showPagination = swiperContainer.dataset.showPagination === "true";
  const showArrows = swiperContainer.dataset.showArrows === "true";

  const swiper = new Swiper(".swiper", {
    slidesPerView: slidesPerViewMobile,
    spaceBetween: spaceBetween,
    pagination: showPagination
      ? {
          el: ".swiper-pagination",
          clickable: true,
        }
      : false,
    navigation: showArrows
      ? {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      : false,
    breakpoints: {
      320: { slidesPerView: slidesPerViewMobile, spaceBetween: 10 },
      768: { slidesPerView: slidesPerViewTablet, spaceBetween: 20 },
      1024: { slidesPerView: slidesPerViewDesktop, spaceBetween: 30 },
    },
  });

  // Image filtering by color
  const variantSelect = document.querySelector("#variant-select");

  if (variantSelect) {
    variantSelect.addEventListener("change", function () {
      const selectedOption = this.options[this.selectedIndex];
      const selectedColor = selectedOption.dataset.color;

      document.querySelectorAll(".swiper-slide").forEach((slide) => {
        const slideColor = slide.dataset.color;
        slide.style.display = !selectedColor || slideColor === selectedColor ? "block" : "none";
      });

      swiper.update(); // Update Swiper after filtering
    });

    // Trigger change event for initial variant
    variantSelect.dispatchEvent(new Event("change"));
  }

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Accordion logic
  window.accordionInitialized = window.accordionInitialized || false;

  if (!window.accordionInitialized) {
    window.accordionInitialized = true; // Mark script as initialized

    const accordion = document.querySelector(".accordion");

    if (accordion) {
      accordion.querySelectorAll(".accordion-header").forEach((header) => {
        const clonedHeader = header.cloneNode(true);
        header.parentNode.replaceChild(clonedHeader, header);
        header = clonedHeader;

        header.addEventListener("click", debounce(handleAccordionClick, 300));

        function handleAccordionClick(event) {
          event.preventDefault();
          event.stopPropagation();

          const item = header.parentElement;
          const isMultiple = accordion.dataset.multiple === "true";
          const wasOpen = item.classList.contains("active");

          // Toggle current item
          item.classList.toggle("active");

          // Close others only if multiple is disabled and the item was opened (not closed)
          if (!isMultiple && !wasOpen) {
            accordion.querySelectorAll(".accordion-item").forEach((sibling) => {
              if (sibling !== item) sibling.classList.remove("active");
            });
          }
        }
      });
    } else {
      console.warn("Accordion (.accordion) not found");
    }
  }
});