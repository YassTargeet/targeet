document.addEventListener("DOMContentLoaded", () => {
    /*****************
     ***           ***
     *** Variables ***
     ***           ***
     *****************/
    const headerContainer = document.querySelector(".header__container");
    const aboutUsSection = document.querySelector("#about-us");
    let animationsTriggered = false;
    const headerHeight = headerContainer.offsetHeight;

    /**
     * Event handler for the window scroll event to change the header background color.
     * The background color changes smoothly when the user scrolls down half the header's height.
     *
     * @listens window:scroll
     */
    window.addEventListener("scroll", () => {
        if (window.scrollY > headerHeight / 2) {
            /**
             * Adds the 'header__container--background' class to the header container when the user scrolls down half the header's height.
             */
            headerContainer.classList.add("header__container--background");
        } else {
            /**
             * Removes the 'header__container--background' class from the header container when the user scrolls up or does not scroll down half the header's height.
             */
            headerContainer.classList.remove("header__container--background");
        }
    });

    /**
     * Triggers animations on the 'about-us' section when the user scrolls to 3/4 of the section's height.
     * The function checks if the section is within the viewport and if animations have not already been triggered.
     * If the conditions are met, it adds the 'about-us--animate' class to the section, preventing multiple triggers.
     *
     * @returns {void}
     */
    const triggerAnimations = () => {
        const sectionRect = aboutUsSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if the user has scrolled to 3/4 of the section's height
        if (
            sectionRect.top + (sectionRect.height * 2) / 5 <= viewportHeight &&
            !animationsTriggered
        ) {
            // Add the class to trigger the animations
            aboutUsSection.classList.add("about-us--animate");
            animationsTriggered = true; // Prevent multiple triggers
        }
    };

    // Écouteur sur l'événement scroll
    window.addEventListener("scroll", triggerAnimations);

    // Vérifie au cas où la section est déjà visible au chargement
    triggerAnimations();

    /****************
     ***          ***
     *** Carousel ***
     ***          ***
     ****************/ 

    $(document).ready(function () {
        const $carousel = $("#carousel");
        const itemCount = $carousel.children().length;

        // Ajoute une classe si le nombre d'éléments est supérieur à 3
        if (itemCount === 1) {
            $carousel.addClass("carousel--solo");
        } else if (itemCount === 2) {
            $carousel.addClass("carousel--duo");
        } else if (itemCount > 3) {
            $carousel.addClass("carousel--large");
        }

        $carousel.slick({
            centerMode: itemCount >= 3, // Active le mode centré uniquement si au moins 3 éléments
            centerPadding: "0px", // Espace autour de l'élément central
            slidesToShow: itemCount >= 3 ? 3 : itemCount, // Nombre d'éléments visibles
            infinite: itemCount >= 3, // Boucle infinie uniquement si suffisamment d'éléments
            arrows: true, // Active les flèches de navigation
            prevArrow:
                '<button class="jobs__control jobs__control--prev" aria-label="Précédent"><i class="fa-solid fa-chevron-left"></i></button>',
            nextArrow:
                '<button class="jobs__control jobs__control--next" aria-label="Suivant"><i class="fa-solid fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 768, // Pour écrans plus petits
                    settings: {
                        slidesToShow: Math.min(itemCount, 1), // Réduit à un seul élément visible si nécessaire
                        centerPadding: "20px",
                    },
                },
            ],
        });
    });


});
