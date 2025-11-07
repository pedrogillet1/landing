// Scroll-triggered animations for About Koda page
document.addEventListener("DOMContentLoaded", () => {
    const sectionsToAnimate = document.querySelectorAll(".animate-on-scroll");

    if (!sectionsToAnimate || sectionsToAnimate.length === 0) {
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // If the element is intersecting the viewport, add the 'is-visible' class
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
            // Optional: Uncomment below to re-animate when scrolling back up
            // else {
            //     entry.target.classList.remove("is-visible");
            // }
        });
    }, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element enters viewport
    });

    // Observe each of the sections
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
});
