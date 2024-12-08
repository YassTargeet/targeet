document.addEventListener("DOMContentLoaded", async () => {
    /*****************
     ***           ***
     *** Variables ***
     ***           ***
     *****************/

    const headerContainer = document.querySelector(".header__container");
    const burgerButton = document.querySelector(".header__burger");
    const navbar = document.querySelector(".header__navbar");
    const navLinks = navbar.querySelectorAll(".header__nav-link");
    const contactLink = document.getElementById("header__contact-us");
    const headerHeight = headerContainer.offsetHeight;
    let animationsTriggered = false;
    const aboutUsSection = document.querySelector("#about-us");
    const jobsContainer = document.getElementById("carousel");
    const jobModal = document.getElementById("job-detail-modal");
    const jobModalBody = jobModal.querySelector(".jobs-modal__body");
    const jobModalClose = jobModal.querySelector(".jobs-modal__close");
    const jobModalOverlay = jobModal.querySelector(".jobs-modal__overlay");
    const profilesContainer = document.querySelector(".profiles__container");
    const profileModal = document.getElementById("profile-detail-modal");
    const profileModalContent = profileModal.querySelector(".profile-modal__content");
    const profileModalCarousel = profileModal.querySelector(".profile-modal__carousel");
    const closeModalButton = profileModal.querySelector(".profile-modal__close");
    const legalModal = document.getElementById("legal-modal");
    const legalOverlay = legalModal.querySelector(".legal__overlay");
    const legalClose = legalModal.querySelector(".legal__close");
    const legalLinks = document.querySelectorAll('a[href="#mentions-legales"]');
    const privacyModal = document.getElementById("privacy-modal");
    const privacyOverlay = privacyModal.querySelector(".confidential__overlay");
    const privacyCloseButton = privacyModal.querySelector(".confidential__close");
    const footerContactLink = document.querySelector(".footer__contact-us");

    // TODO: supprimer les mail-to quand le module d'envoie de mail sera mis en place

    /*****************
     ***           ***
     *** Load JSON ***
     ***           ***
     *****************/

    /**
     * Asynchronously loads job data from a local JSON file.
     *
     * This function fetches data from the `./datas/jobs.json` file,
     * parses it as JSON, and returns the list of jobs if successful.
     * If the data does not have a `jobs` array or if an error occurs
     * (like a network failure), an empty array is returned to avoid
     * runtime errors.
     *
     * @async
     * @function loadJobsData
     * @returns {Promise<Array>} A promise that resolves to an array of jobs.
     * If an error occurs, it returns an empty array
     */
    const loadJobsData = async () => {
        try {
            const response = await fetch("./datas/jobs.json");
            if (!response.ok) throw new Error("Failed to fetch jobs data");
            const data = await response.json();
            if (!Array.isArray(data.jobs)) throw new Error("JSON 'jobs' is not an array");
            return data.jobs;
        } catch (error) {
            console.error("Error loading jobs data:", error);
            return [];
        }
    };

    /**
     * Asynchronously loads profile data from a local JSON file.
     *
     * This function fetches data from the `./datas/profiles.json` file,
     * parses it as JSON, and returns the parsed object if successful.
     * In case of an error (e.g., network failure or an invalid response),
     * it logs the error and returns a fallback object with an empty `profile` array.
     *
     * @async
     * @function loadProfilesData
     * @returns {Promise<Object>} A promise that resolves to an object containing the profiles data.
     * If an error occurs, it returns a fallback object with an empty `profile` array: `{ profile: [] }`.
     */
    const loadProfilesData = async () => {
        try {
            const response = await fetch("./datas/profiles.json");
            if (!response.ok) throw new Error("Failed to load profiles data");
            return await response.json();
        } catch (error) {
            console.error("Error loading profiles data:", error);
            return { profile: [] };
        }
    };

    const profilesData = await loadProfilesData();
    const jobs = await loadJobsData();

    /**************
     ***        ***
     *** Header ***
     ***        ***
     **************/

    /**
     * Manage header background when scroll down
     *
     * @event scroll
     */
    window.addEventListener("scroll", () => {
        if (window.scrollY > headerHeight / 2) {
            headerContainer.classList.add("header__container--background");
        } else {
            headerContainer.classList.remove("header__container--background");
        }
    });

    /**
     * Manage sending email when the user clicks on contact us
     *
     * @event click
     * @param {Event} event - The event object for the click event.
     */
    contactLink.addEventListener("click", (event) => {
        event.preventDefault();

        const email = "y.beck@targeet.io";
        const cc = "recrutement@targeet.io";
        const subject = "Demande de contact";
        const body = `
Bonjour,

Je souhaite en savoir plus sur vos services. Quand seriez-vous disponible pour échanger ?

Cordialement,
        `.trim();

        const mailtoLink = `mailto:${email}?cc=${cc}&subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    });

    /**
     * Toggles the visibility of the mobile navigation menu and closes it when a link is clicked.
     *
     * @event click - Triggered when the user clicks on the burger button or any navigation link.
     */
    burgerButton.addEventListener("click", () => {
        navbar.classList.toggle("header__navbar--active");
    });

    /**
     * Closes the mobile navigation menu when any navigation link is clicked.
     *
     * @event click - Triggered when a user clicks on one of the navigation links.
     */
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("header__navbar--active");
        });
    });

    /****************
     ***          ***
     *** About-us ***
     ***          ***
     ****************/

    /**
     * Triggers animations for the "About Us" section when it enters the viewport.
     *
     * This function calculates the position of the "About Us" section relative to the
     * viewport. When a certain portion of the section becomes visible in the viewport,
     * it adds the `about-us--animate` class to trigger animations.
     * This animation will only run once thanks to the `animationsTriggered` flag.
     *
     * @function triggerAnimations
     *
     * @description
     * 1️⃣ **Calculate element position** — Uses `getBoundingClientRect()` to get the position of the "About Us" section relative to the viewport.
     * 2️⃣ **Check if the section is visible** — If at least 40% (calculated as `(2 / 5)`) of the height of the section is visible in the viewport, the animation is triggered.
     * 3️⃣ **Trigger animation** — The class `about-us--animate` is added to the section, enabling animations (typically defined in CSS).
     * 4️⃣ **Run animation only once** — The `animationsTriggered` variable ensures that the animation is triggered only once per page load.
     *
     * @global {HTMLElement} aboutUsSection - The "About Us" section element that should be animated.
     * @global {boolean} animationsTriggered - A flag to ensure animations only run once.
     *
     */
    const triggerAnimations = () => {
        const sectionRect = aboutUsSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (
            sectionRect.top + (sectionRect.height * 2) / 5 <= viewportHeight &&
            !animationsTriggered
        ) {
            aboutUsSection.classList.add("about-us--animate");
            animationsTriggered = true;
        }
    };

    // Trigger the animation when the user scrolls down
    window.addEventListener("scroll", triggerAnimations);
    triggerAnimations();

    /*******************************
     ***                         ***
     *** Génère le Jobs Carousel ***
     ***                         ***
     *******************************/

    /**
     * Creates a job item element to be displayed in the job listing carousel.
     *
     * This function takes a job object as input and dynamically creates an
     * HTML `article` element representing a single job listing. The article
     * contains information about the job, such as title, salary, duration, location,
     * description, tags, and call-to-action buttons ("Learn More" and "Apply").
     *
     * The structure follows the BEM (Block Element Modifier) naming convention for
     * class names, allowing for better readability and reusability of styles.
     *
     * @function createJobItem
     *
     * @param {Object} job - The job data object containing all the information to be displayed.
     * @param {string} job.id - The unique identifier for the job.
     * @param {string} job.title - The title of the job.
     * @param {string} job.salary - The salary for the job.
     * @param {string} job.duration - The duration (full-time, part-time, etc.) of the job.
     * @param {string} job.location - The location of the job.
     * @param {string} job.description - A brief description of the job.
     * @param {Array<string>} job.tags - A list of tags (skills, categories, etc.) for the job.
     *
     * @returns {HTMLElement} - The dynamically created job item as an `article` element.
     *
     * @example
     * const job = {
     *   id: '1',
     *   title: 'Frontend Developer',
     *   salary: '$60,000 - $80,000',
     *   duration: 'Full-Time',
     *   location: 'Remote',
     *   description: 'We are looking for a skilled frontend developer to join our team.',
     *   tags: ['JavaScript', 'React', 'CSS']
     * };
     *
     * const jobItemElement = createJobItem(job);
     * document.querySelector('#jobs-container').appendChild(jobItemElement);
     */
    const createJobItem = (job) => {
        const article = document.createElement("article");
        article.className = "jobs__item";
        article.style.width = "652px";
        article.dataset.id = job.id;

        article.innerHTML = `
            <div class="jobs__content">
                <h2 class="jobs__title">${job.title}</h2>
                <div class="jobs__infos">
                    <div class="jobs__salary"><i class="fa-solid fa-dollar-sign"></i><p>${
                        job.salary
                    }</p></div>
                    <div class="jobs__duration"><i class="fa-regular fa-clock"></i><p>${
                        job.duration
                    }</p></div>
                    <div class="jobs__place"><i class="fa-solid fa-location-dot"></i><p>${
                        job.location
                    }</p></div>
                </div>
                <div class="jobs__description">
                    <p class="jobs__description--content">${job.description}</p>
                </div>
                <div class="jobs__tag">
                    <i class="fa-solid fa-tag"></i>
                    ${job.tags.map((tag) => `<p class="jobs__tag--item">${tag}</p>`).join("")}
                </div>
                <div class="jobs__cta">
                    <button class="jobs__button jobs__more" data-id="${
                        job.id
                    }">En savoir plus</button>
                    <button class="jobs__button jobs__apply" data-id="${job.id}">Postuler</button>
                </div>
            </div>
        `;
        return article;
    };

    /**
     * Loops through each job in the jobs array and creates a job item for the carousel.
     *
     * @param {Array} jobs - An array of job objects, where each job contains
     * information such as title, salary, duration, location, and tags.
     */
    jobs.forEach((job) => {
        const jobItem = createJobItem(job);
        jobsContainer.appendChild(jobItem);
    });

    /******************************
     ***                        ***
     *** Initialise Slick  Jobs ***
     ***                        ***
     ******************************/

    /**
     * Initializes the Slick carousel with different configurations based on the number of items.
     *
     * This code waits for the DOM to be fully loaded using `$(document).ready()`.
     * It then initializes a Slick carousel for the `#carousel` element, customizing
     * its behavior depending on how many child items are present in the carousel.
     *
     * @example
     * // When the page loads, the following occurs:
     * - Counts the number of child elements in the carousel.
     * - Adds a specific class (`carousel--solo`, `carousel--duo`, or `carousel--large`)
     *   to the carousel to allow for specific CSS styling based on the number of items.
     * - Initializes the Slick carousel with specific configurations,
     *   such as `slidesToShow`, `centerMode`, and responsive breakpoints.
     */
    $(document).ready(() => {
        const $carousel = $("#carousel");
        const itemCount = $carousel.children().length;

        // Dynamically assign classes to the carousel based on the number of items
        if (itemCount === 1) {
            $carousel.addClass("carousel--solo");
        } else if (itemCount === 2) {
            $carousel.addClass("carousel--duo");
        } else if (itemCount > 3) {
            $carousel.addClass("carousel--large");
        }
        // Initializes the Slick carousel with custom options
        $carousel.slick({
            centerMode: itemCount >= 3,
            centerPadding: "50px",
            slidesToShow: Math.min(3, itemCount),
            infinite: itemCount >= 3,
            arrows: true,

            // Custom HTML for the navigation arrows
            prevArrow:
                '<button class="jobs__control jobs__control--prev" aria-label="Précédent"><i class="fa-solid fa-chevron-left"></i></button>',
            nextArrow:
                '<button class="jobs__control jobs__control--next" aria-label="Suivant"><i class="fa-solid fa-chevron-right"></i></button>',

            // Responsive settings for smaller screens
            responsive: [
                {
                    breakpoint: 996,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "20px",
                    },
                },
            ],
        });
    });

    /********************
     ***              ***
     *** Email Helper ***
     ***              ***
     ********************/

    /**
     * Sends an email using the `mailto:` protocol.
     *
     * This function generates a `mailto:` link and redirects the browser to it,
     * which triggers the user's default email client (like Outlook, Gmail, or Apple Mail)
     * to open a new email draft with pre-filled details such as the recipient,
     * CC (carbon copy), subject, and message body.
     *
     * @param {string} email - The primary recipient's email address.
     * @param {string} cc - The email address to be added as a CC (carbon copy) recipient.
     * @param {string} subject - The subject of the email.
     * @param {string} body - The body content of the email message.
     *
     * @example
     * sendEmail(
     *    'contact@example.com',
     *    'cc@example.com',
     *    'Request for Information',
     *    'Hello, I would like to learn more about your services.'
     * );
     *
     * // This will open the default mail client with the following details:
     * // - To: contact@example.com
     * // - CC: cc@example.com
     * // - Subject: Request for Information
     * // - Body: Hello, I would like to learn more about your services.
     */
    const sendEmail = (email, cc, subject, body) => {
        // Generates a mailto link with the provided email, CC, subject, and body
        const mailtoLink = `mailto:${email}?cc=${cc}&subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;

        // Redirects the browser to the generated mailto link
        window.location.href = mailtoLink;
    };

    /********************
     ***              ***
     *** Jobs Modales ***
     ***              ***
     ********************/

    /**
     * Generates the HTML content for a job detail modal.
     *
     * This function creates the content of a job modal using template literals.
     * It dynamically inserts job details such as title, salary, location, duration,
     * company description, job description, missions, and the required profile.
     *
     * The modal content is structured with semantic HTML elements like headings,
     * paragraphs, unordered lists, and buttons, making it easy to display detailed job information.
     *
     * @param {Object} job - The job object containing all the information to be displayed in the modal.
     * @param {string} job.title - The title of the job.
     * @param {string} job.salary - The salary offered for the position.
     * @param {string} job.location - The location where the job is based.
     * @param {string} job.duration - The duration of the job (e.g., full-time, part-time, contract).
     * @param {string} job.companyDescription - A brief description of the company offering the job.
     * @param {string} job.jobDescription - A detailed description of the job role.
     * @param {Array<string>} job.missions - A list of key tasks or missions for the role.
     * @param {Object} job.profile - The profile of the ideal candidate.
     * @param {string} job.profile.experience - The required experience for the job.
     * @param {string} job.profile.skills - The technical or soft skills required for the position.
     * @param {string} job.profile.languages - The languages the candidate must know.
     * @param {number} job.id - The unique identifier for the job.
     *
     * @returns {string} - A string containing the complete HTML for the modal content.
     *
     * @example
     * const job = {
     *    id: 1,
     *    title: "Full Stack Developer",
     *    salary: "$80k - $100k",
     *    location: "Remote",
     *    duration: "Full-time",
     *    companyDescription: "A tech company focused on AI and machine learning.",
     *    jobDescription: "Build and maintain web applications...",
     *    missions: ["Develop new features", "Fix bugs", "Write tests"],
     *    profile: {
     *       experience: "3+ years in web development",
     *       skills: "JavaScript, React, Node.js",
     *       languages: "English, French"
     *    }
     * };
     *
     * const modalContent = createModalContent(job);
     * console.log(modalContent); // Logs the complete HTML string of the job modal
     */
    const createModalContent = (job) => {
        return `
            <h1 class="jobs-modal__title">${job.title}</h1>
            <div class="jobs-modal__info">
                <p class="jobs-modal__salary"><strong>Salaire :</strong> ${job.salary}</p>
                <p class="jobs-modal__location"><strong>Lieu :</strong> ${job.location}</p>
                <p class="jobs-modal__duration"><strong>Durée :</strong> ${job.duration}</p>
            </div>
            <div class="jobs-modal__section">
                <h2 class="jobs-modal__section-title">Description de l'entreprise</h2>
                <p>${job.companyDescription}</p>
            </div>
            <div class="jobs-modal__section">
                <h2 class="jobs-modal__section-title">Description du poste</h2>
                <p>${job.jobDescription}</p>
            </div>
            <div class="jobs-modal__section">
                <h2 class="jobs-modal__section-title">Missions</h2>
                <ul class="jobs-modal__list">${job.missions
                    .map((mission) => `<li>${mission}</li>`)
                    .join("")}</ul>
            </div>
            <div class="jobs-modal__section">
                <h2 class="jobs-modal__section-title">Profil recherché</h2>
                <ul class="jobs-modal__list">
                    <li><strong>Expérience :</strong> ${job.profile.experience}</li>
                    <li><strong>Compétences :</strong> ${job.profile.skills}</li>
                    <li><strong>Langues :</strong> ${job.profile.languages}</li>
                </ul>
            </div>
            <button class="jobs-modal__button jobs__apply" data-id="${job.id}">Postuler</button>
        `;
    };

    /**
     * Displays a modal with dynamic content.
     *
     * This function makes a hidden modal visible by updating its classes, visibility, and opacity.
     * It also injects the provided content into the modal body and triggers any animations
     * or transitions associated with the modal content.
     *
     * @param {HTMLElement} modal - The modal element to be displayed.
     * @param {string} content - The HTML string to be injected into the modal body.
     *
     * @example
     * // Example usage:
     * const modal = document.getElementById("job-detail-modal");
     * const jobContent = `<h1>Job Title</h1><p>Job details...</p>`;
     * showModal(modal, jobContent);
     *
     * // The modal will become visible, and the content will be displayed inside it.
     */
    const showModal = (modal, content) => {
        jobModalBody.innerHTML = content;
        modal.classList.remove("hidden");
        modal.style.visibility = "visible";
        modal.style.opacity = "1";

        const modalContent = modal.querySelector(".jobs-modal__content");
        modalContent.classList.add("show");
    };

    /**
     * Hides a modal and resets its visibility, opacity, and animations.
     *
     * This function hides a visible modal by adding the "hidden" class,
     * and explicitly sets `visibility` and `opacity` to ensure it is
     * no longer visible. Additionally, it removes any animation-related
     * classes from the modal content.
     *
     * @param {HTMLElement} modal - The modal element to be hidden.
     *
     * @example
     * // Example usage:
     * const modal = document.getElementById("job-detail-modal");
     * hideModal(modal);
     *
     * // The modal will be hidden from view, and all animations will be reset.
     */
    const hideModal = (modal) => {
        modal.classList.add("hidden");
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";

        const modalContent = modal.querySelector(".jobs-modal__content");
        modalContent.classList.remove("show");
    };

    /**
     * Handles click events on "More" and "Apply" buttons for job listings.
     *
     * This event listener detects when the user clicks on the "More" or "Apply" buttons
     * in the list of jobs. Depending on the button clicked, it either opens a modal
     * with job details or opens the user's email client to apply for the job.
     *
     * @param {Event} event - The click event triggered when the user clicks anywhere on the page.
     *
     * @example
     * // When the user clicks on the "More" button for a job with ID 1:
     * <button class="jobs__more" data-id="1">En savoir plus</button>
     * // A modal will open with the details of the job.
     *
     * // When the user clicks on the "Apply" button for a job with ID 2:
     * <button class="jobs__apply" data-id="2">Postuler</button>
     * // The user's email client will open with a pre-filled message to apply for the job.
     */
    document.addEventListener("click", (event) => {
        // If the user clicks on "En savoir plus"
        if (event.target.classList.contains("jobs__more")) {
            const jobId = parseInt(event.target.dataset.id, 10);
            const job = jobs.find((job) => job.id === jobId);

            if (job) {
                const modalContent = createModalContent(job);
                showModal(jobModal, modalContent);
            }
        }
        // If the user clicks on "Postuler"
        else if (event.target.classList.contains("jobs__apply")) {
            const jobId = parseInt(event.target.dataset.id, 10);
            const job = jobs.find((job) => job.id === jobId);

            if (job) {
                const email = "y.beck@targeet.io";
                const cc = " recrutement@targeet.io";
                const subject = `Candidature à l'offre ${job.title} - id: ${job.id}`;
                const body = `
Bonjour,

Je suis intéressé par l'offre ${job.title} - id: ${job.id} que vous avez publiée. Quand seriez-vous disponible pour en discuter ?

Vous trouverez mon CV en pièce jointe.

Cordialement,
                `.trim();

                sendEmail(email, cc, subject, body);
            }
        }
    });

    // Close the modal when the close button is clicked
    jobModalClose.addEventListener("click", () => hideModal(jobModal));

    // Close the modal when the user clicks on the overlay (outside the modal)
    jobModalOverlay.addEventListener("click", () => hideModal(jobModal));

    // Close the modal when the "Escape" key is pressed
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !jobModal.classList.contains("hidden")) {
            hideModal(jobModal);
        }
    });

    /****************
     ***          ***
     *** Profiles ***
     ***          ***
     ****************/

    // Random positioning of technologies

    /**
     * An object mapping technology names to their associated image paths.
     *
     * @type {Object<string, string>}
     * @property {string} Dynamics365 - Path to the image for Dynamics 365.
     * @property {string} Office365 - Path to the image for Office 365.
     * @property {string} "Power Platform" - Path to the image for Power Platform.
     * @property {string} .Net - Path to the image for .Net.
     * @property {string} PowerBi - Path to the image for Power BI.
     * @property {string} Biztalk - Path to the image for BizTalk.
     */
    const technologyImages = {
        Dynamics365: "./public/img/dynamics.jpg",
        Office365: "./public/img/office365.jpg",
        "Power Platform": "./public/img/powerplatform.jpg",
        ".Net": "./public/img/dotnet.jpg",
        PowerBi: "./public/img/powerbi.jpg",
        Biztalk: "./public/img/biztalk.jpg",
    };

    /**
     * Shuffles an array using the Fisher-Yates algorithm.
     * This method randomly swaps elements in the array, ensuring an unbiased shuffle.
     *
     * @param {Array} array - The array to be shuffled.
     * @return {Array} - The shuffled array.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const shuffledNumbers = shuffleArray(numbers);
     * console.log(shuffledNumbers); // Example output: [3, 1, 5, 2, 4]
     */
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    /**
     * Converts the `technologyImages` object into an array of key-value pairs
     * and shuffles them to create a random order.
     *
     * @constant {Array} shuffledTechnologies - An array of shuffled key-value pairs
     * representing the technology names and their corresponding image paths.
     */
    const shuffledTechnologies = shuffleArray(Object.entries(technologyImages));

    /**
     * Iterates through the shuffled technologies to dynamically create
     * and display profile cards for each technology.
     *
     * Each card contains:
     * - An image of the technology.
     * - The technology name as a title.
     * - A "Search" button for further interaction.
     *
     * @param {Array} shuffledTechnologies - An array of shuffled technology data.
     *
     * @example
     * // Example shuffledTechnologies array:
     * // [
     * //   ["Power Platform", "./public/img/powerplatform.jpg"],
     * //   ["Office365", "./public/img/office365.jpg"],
     * //   ["Dynamics365", "./public/img/dynamics.jpg"]
     * // ]
     *
     * // Result:
     * // Dynamically generates a list of profile cards for each technology.
     */
    shuffledTechnologies.forEach(([technology, imageSrc], index) => {
        // Create item element
        const item = document.createElement("div");
        item.classList.add(`profiles__item--${index + 1}`);

        // Create 'profiles__image' div and the img inside
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("profiles__image");

        const imageElement = document.createElement("img");
        imageElement.src = imageSrc;
        imageElement.alt = `Image de la technologie ${technology}`;
        imageElement.classList.add("profiles__item-image");

        imageContainer.appendChild(imageElement);

        // Create title
        const titleElement = document.createElement("h3");
        titleElement.classList.add("profiles__item-title");
        titleElement.textContent = technology;

        // Create search button
        const buttonElement = document.createElement("button");
        buttonElement.classList.add("profiles__button");
        buttonElement.textContent = "Rechercher";

        // Add all elements to item
        item.appendChild(imageContainer);
        item.appendChild(titleElement);
        item.appendChild(buttonElement);

        // Add item to container
        profilesContainer.appendChild(item);
    });

    // Manage carousel modal

    /**
     * Creates and initializes a profile carousel inside the profile modal.
     *
     * This function generates a card for each profile, displaying key information such as:
     * - Code name
     * - Speciality
     * - Main technologies
     * - Work experience
     * - Technical and soft skills
     *
     * After all profile cards are created, it initializes the Slick carousel to allow navigation
     * between profiles.
     *
     * @param {Array} profiles - An array of profile objects where each profile contains
     * properties like id, codeName, speciality, mainTechnologies, experience, technicalSkills, and softSkills.
     *
     * @example
     * // Sample profile object
     * const profiles = [
     *   {
     *     id: 1,
     *     codeName: 'Agent X',
     *     speciality: 'Frontend Developer',
     *     mainTechnologies: ['JavaScript', 'Vue.js', 'CSS'],
     *     experience: [
     *       { years: '2020-2022', company: 'Tech Corp', missions: ['Developed components', 'Fixed bugs'] }
     *     ],
     *     technicalSkills: ['HTML', 'CSS', 'JavaScript'],
     *     softSkills: ['Teamwork', 'Problem Solving']
     *   }
     * ];
     *
     * createProfileCarousel(profiles);
     */
    const createProfileCarousel = (profiles) => {
        // Clean existing carousel
        profileModalCarousel.innerHTML = "";

        // Loop through each profile to create a profile card
        profiles.forEach((profile) => {
            const profileHTML = `
        <div class="profile-modal__card" id="profile-${profile.id}">
            <h2 class="profile-modal__title">${profile.codeName}</h2>
            <p class="profile-modal__speciality"><strong>Spécialité:</strong> ${
                profile.speciality
            }</p>
            
            <!-- Main Technologies -->
            <div class="profile-modal__section">
                <h3 class="profile-modal__section--title">Main Technologies</h3>
                <ul class="profile-modal__technologies">
                    ${profile.mainTechnologies
                        .map((tech) => `<li class="profile-modal__tech">${tech}</li>`)
                        .join("")}
                </ul>
            </div>

            <!-- Experience -->
            <div class="profile-modal__section">
                <h3 class="profile-modal__section--title">Experience</h3>
                <ul class="profile-modal__experience">
                    ${profile.experience
                        .map(
                            (exp) => `
                            <li class="profile-modal__experience-item">
                                <p><strong>${exp.years}:</strong> ${exp.company}</p>
                                <ul class="profile-modal__missions">
                                    ${exp.missions
                                        .map(
                                            (mission) =>
                                                `<li class="profile-modal__mission">${mission}</li>`
                                        )
                                        .join("")}
                                </ul>
                            </li>
                        `
                        )
                        .join("")}
                </ul>
            </div>

            <!-- Technical Skills -->
            <div class="profile-modal__section">
                <h3 class="profile-modal__section--title">Technical Skills</h3>
                <ul class="profile-modal__skills">
                    ${profile.technicalSkills
                        .map((skill) => `<li class="profile-modal__skill">${skill}</li>`)
                        .join("")}
                </ul>
            </div>

            <!-- Soft Skills -->
            <div class="profile-modal__section">
                <h3 class="profile-modal__section--title">Soft Skills</h3>
                <ul class="profile-modal__soft-skills">
                    ${profile.softSkills
                        .map((skill) => `<li class="profile-modal__soft-skill">${skill}</li>`)
                        .join("")}
                </ul>
            </div>

            <!-- Contact Button -->
            <div class="profile-modal__actions">
                <button class="profile-modal__contact-button" 
                    data-email="contact@example.com" 
                    data-profile="${profile.codeName}">
                    Contacter
                </button>
            </div>
        </div>`;

            // Add the profile card to the carousel container
            profileModalCarousel.innerHTML += profileHTML;
        });

        // Initialize the Slick carousel
        $(profileModalCarousel).slick({
            centerMode: true,
            centerPadding: "50px",
            slidesToShow: 1,
            infinite: true,
            arrows: true,
            prevArrow:
                '<button class="profile-modal__control profile-modal__control--prev" aria-label="Précédent"><i class="fa-solid fa-chevron-left"></i></button>',
            nextArrow:
                '<button class="profile-modal__control profile-modal__control--next" aria-label="Suivant"><i class="fa-solid fa-chevron-right"></i></button>',
        });
    };

    /**
     * Opens the profile modal and displays the profile carousel.
     *
     * @param {Array} profiles - An array of profile objects to be displayed in the carousel.
     *
     * @example
     * // Sample profile object
     * const profiles = [
     *   {
     *     id: 1,
     *     codeName: 'Agent X',
     *     speciality: 'Frontend Developer',
     *     mainTechnologies: ['JavaScript', 'Vue.js', 'CSS'],
     *     experience: [
     *       { years: '2020-2022', company: 'Tech Corp', missions: ['Developed components', 'Fixed bugs'] }
     *     ],
     *     technicalSkills: ['HTML', 'CSS', 'JavaScript'],
     *     softSkills: ['Teamwork', 'Problem Solving']
     *   }
     * ];
     *
     * openProfileModal(profiles);
     */
    const openProfileModal = (profiles) => {
        createProfileCarousel(profiles);
        profileModal.classList.remove("profile-modal--hidden");
        profileModal.style.visibility = "visible";
        profileModal.style.opacity = "1";
        profileModalContent.classList.add("show");
    };

    /**
     * Closes the profile modal and resets its state.
     *
     * This function hides the profile modal, resets its visibility and opacity,
     * and stops any ongoing animations. It also destroys the Slick carousel
     * to prevent issues when reopening the modal.
     *
     * @example
     * // Call this function to close the profile modal
     * closeProfileModal();
     */
    const closeProfileModal = () => {
        profileModal.classList.add("profile-modal--hidden");
        profileModal.style.visibility = "hidden";
        profileModal.style.opacity = "0";
        profileModalContent.classList.remove("show");

        // Détruire le carousel Slick pour éviter les conflits lors de la réouverture
        if ($(profileModalCarousel).hasClass("slick-initialized")) {
            $(profileModalCarousel).slick("unslick");
        }
    };

    /**
     * Attaches an event listener to the close button of the profile modal.
     */
    closeModalButton.addEventListener("click", closeProfileModal);

    /**
     * Attaches click event listeners to all buttons with the `.profiles__button` class.
     *
     * When a button is clicked, it extracts the corresponding technology name,
     * filters the profiles that match this technology, and opens a modal displaying the related profiles.
     *
     * @example
     * // Attaches click event to each button with the class "profiles__button"
     * document.querySelectorAll(".profiles__button").forEach((button) => { ... });
     */
    document.querySelectorAll(".profiles__button").forEach((button) => {
        button.addEventListener("click", () => {
            const technology = button.previousElementSibling.textContent.trim();
            console.log(technology);

            // Charger les profils correspondants
            const matchingProfiles = profilesData.profile.filter((profile) =>
                profile.mainTechnologies.includes(technology)
            );

            if (matchingProfiles.length) {
                openProfileModal(matchingProfiles);
            } else {
                alert("Aucun profil trouvé pour cette technologie.");
            }
        });
    });

    /**
     * Handles the click event on the profile contact button inside the profile modal.
     *
     * When the user clicks a **Contact** button, this function retrieves the profile name
     * and opens the user's email client with a pre-filled message using the `mailto:` protocol.
     *
     * @event click - Triggered when any element inside the profileModalCarousel is clicked.
     */
    profileModalCarousel.addEventListener("click", (event) => {
        if (event.target.classList.contains("profile-modal__contact-button")) {
            const email = "y.beck@targeet.io";
            const cc = "recrutement@targeet.io";
            const profileName = event.target.dataset.profile;
            const subject = `Intérêt pour un profil : ${profileName}`;
            const body = `
Bonjour,

Le profil ${profileName} que j'ai vu sur votre site m'intéresse. Serait-il possible d'en savoir plus ?

Cordialement,
            `.trim();
            const mailtoLink = `mailto:${email}?cc=${cc}&subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }
    });

    /************************
     ***                  ***
     *** Mentions légales ***
     ***                  ***
     ************************/

    /**
     * Opens the **Legal Modal** and makes it visible to the user.
     *
     * This function removes the class that hides the modal, makes it visible,
     * sets its opacity to 1 (fully visible), and triggers the "show" animation
     * on the content inside the modal.
     */
    const openLegalModal = () => {
        legalModal.classList.remove("legal--hidden");
        legalModal.style.visibility = "visible";
        legalModal.style.opacity = "1";

        const legalContent = legalModal.querySelector(".legal__content");
        legalContent.classList.add("show");
    };

    /**
     * Closes the **Legal Modal** and hides it from the user.
     *
     * This function hides the modal by adding a hidden class, setting its visibility
     * to "hidden", and reducing its opacity to 0 (fully transparent). It also removes
     * the "show" class from the modal content, stopping any active animations.
     */
    const closeLegalModal = () => {
        legalModal.classList.add("legal--hidden");
        legalModal.style.visibility = "hidden";
        legalModal.style.opacity = "0";

        const legalContent = legalModal.querySelector(".legal__content");
        legalContent.classList.remove("show");
    };

    /**
     * Attaches a **click event listener** to each legal link to open the Legal Modal.
     *
     * This function ensures that clicking on any link related to "Legal Mentions"
     * will prevent the default page navigation and trigger the display of the Legal Modal.
     */
    legalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            openLegalModal();
        });
    });

    // Close the Legal Modal when clicking on the overlay (the background behind the modal)
    legalOverlay.addEventListener("click", closeLegalModal);

    // Close the Legal Modal when clicking on the close button inside the modal
    legalClose.addEventListener("click", closeLegalModal);

    // Close the Legal Modal when pressing the "Escape" key on the keyboard
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !legalModal.classList.contains("legal--hidden")) {
            closeLegalModal();
        }
    });

    /************************************
     ***                              ***
     *** Politique de confidentialité ***
     ***                              ***
     ************************************/

    /**
     * 📜 **Show Privacy Modal**
     *
     * This function **displays the privacy policy modal** by making it visible and fully opaque.
     *
     * **Steps performed:**
     * 1️⃣ Removes the **`confidential--hidden`** class to make the modal visible.
     * 2️⃣ Sets **`visibility: visible`** and **`opacity: 1`** to display the modal with a fade-in effect.
     * 3️⃣ Adds the **`show`** class to the modal content, which can be used to trigger animations.
     */
    const showPrivacyModal = () => {
        privacyModal.classList.remove("confidential--hidden");
        privacyModal.style.visibility = "visible";
        privacyModal.style.opacity = "1";

        const privacyContent = privacyModal.querySelector(".confidential__content");
        privacyContent.classList.add("show");
    };

    /**
     * 📜 **Hides the Privacy Policy Modal**
     *
     * This function hides the privacy policy modal by:
     * - Adding the `confidential--hidden` class to the modal, which triggers its CSS to hide it.
     * - Setting the `visibility` and `opacity` properties to `hidden` and `0`, ensuring the modal is fully hidden.
     * - Removing the `show` class from the privacy content, ensuring any animations are reset.
     */
    const hidePrivacyModal = () => {
        privacyModal.classList.add("confidential--hidden");
        privacyModal.style.visibility = "hidden";
        privacyModal.style.opacity = "0";

        const privacyContent = privacyModal.querySelector(".confidential__content");
        privacyContent.classList.remove("show");
    };

    /**
     * 📜 **Handles Click Events for Legal and Privacy Policy Links**
     *
     * This event listener listens for clicks on the entire document.
     * It performs two main actions based on the clicked element:
     *
     * 1️⃣ **Opens the Privacy Policy Modal**:
     *    - Detects if the clicked element is a link with `href="#politique-confidentialite"`.
     *    - Prevents the default navigation behavior of the link.
     *    - Closes the **Legal Mentions Modal** if it is open.
     *    - Opens the **Privacy Policy Modal**.
     *
     * 2️⃣ **Opens the Legal Mentions Modal**:
     *    - Detects if the clicked element is a link with `href="#mentions-legales"`.
     *    - Prevents the default navigation behavior of the link.
     *    - Opens the **Legal Mentions Modal**.
     */
    document.addEventListener("click", (event) => {
        // Click on "politique de confidentialité" link
        if (event.target.matches('a[href="#politique-confidentialite"]')) {
            event.preventDefault();
            closeLegalModal();
            showPrivacyModal();
        }

        // Click on "mentions légales" link
        if (event.target.matches('a[href="#mentions-legales"]')) {
            event.preventDefault();
            openLegalModal();
        }
    });

    // Close the privacy modal when clicking the close button
    privacyCloseButton.addEventListener("click", hidePrivacyModal);

    // Close the privacy modal when clicking outside on the overlay
    privacyOverlay.addEventListener("click", hidePrivacyModal);

    // Close the privacy modal when pressing the Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && privacyModal.style.visibility === "visible") {
            hidePrivacyModal();
        }
    });

    /**********************
     ***                ***
     *** contact footer ***
     ***                ***
     **********************/

    /**
     * 📧 **Handles the Footer Contact Link Click**
     *
     * When the user clicks on the "Contact Us" link in the footer, this function prevents the default
     * navigation behavior and opens the user's default email client with a pre-filled email.
     *
     * 🛠️ **How It Works**
     * 1️⃣ **Prevent Default Click Action**:
     *    - `event.preventDefault()` stops the default action of the link, which would normally navigate to a new page.
     *
     * 2️⃣ **Email Setup**:
     *    - **Recipient**: The email will be sent to **y.beck@targeet.io**.
     *    - **CC (Carbon Copy)**: A copy of the email will also be sent to **recrutement@targeet.io**.
     *    - **Subject**: The subject line is set to **"Demande de contact"**.
     *    - **Body**: The body of the email contains a default message prompting for more information.
     *
     * 3️⃣ **Mailto Link Construction**:
     *    - Constructs a `mailto:` link with all the necessary parameters (recipient, CC, subject, and body).
     *
     * 4️⃣ **Open Email Client**:
     *    - Uses `window.location.href = mailtoLink` to trigger the user's default email client to open with the pre-filled message.
     */
    footerContactLink.addEventListener("click", (event) => {
        event.preventDefault();

        const email = "y.beck@targeet.io";
        const cc = "recrutement@targeet.io";
        const subject = "Demande de contact";
        const body = `
Bonjour,

Je souhaite en savoir plus sur vos services. Quand seriez-vous disponible pour échanger ?

Cordialement,
        `.trim();

        const mailtoLink = `mailto:${email}?cc=${cc}&subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    });
});
