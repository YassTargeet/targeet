document.addEventListener("DOMContentLoaded", async () => {
    /*****************
     *** Variables ***
     *****************/
    // const headerContainer = document.querySelector(".header__container");
    // const aboutUsSection = document.querySelector("#about-us");
    // const jobsContainer = document.getElementById("carousel");
    // const jobModal = document.getElementById("job-detail-modal");
    // const jobModalBody = jobModal.querySelector(".jobs-modal__body");
    // let animationsTriggered = false;
    // const headerHeight = headerContainer.offsetHeight;
    // const contactLink = document.getElementById("header__contact-us");

    const headerContainer = document.querySelector(".header__container");
    const aboutUsSection = document.querySelector("#about-us");
    const jobsContainer = document.getElementById("carousel");
    const jobModal = document.getElementById("job-detail-modal");
    const jobModalBody = jobModal.querySelector(".jobs-modal__body");
    const profileModal = document.getElementById("profile-detail-modal");
    const profileModalContent = profileModal.querySelector(".profile-modal__content");
    const profileButtons = document.querySelectorAll(".profiles__button");
    let profilesData = null;
    let animationsTriggered = false;
    const headerHeight = headerContainer.offsetHeight;
    const contactLink = document.getElementById("header__contact-us");

    /****************
     *** Header ***
     ****************/
    window.addEventListener("scroll", () => {
        if (window.scrollY > headerHeight / 2) {
            headerContainer.classList.add("header__container--background");
        } else {
            headerContainer.classList.remove("header__container--background");
        }
    });

    contactLink.addEventListener("click", (event) => {
        // Prevent the default navigation behavior
        event.preventDefault();

        // Define email details
        //TODO: mettre la bonne adresse
        const email = "recrutement@example.com"; // Replace with the desired email address
        const subject = "Nous contacter"; // Subject line
        const body = `
Bonjour,

Je souhaite obtenir plus d'informations sur vos services.

Cordialement,
[Votre nom]
        `.trim(); // Predefined email body text

        // Open the user's email client
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    });

    /****************
     *** About-us ***
     ****************/
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

    window.addEventListener("scroll", triggerAnimations);
    triggerAnimations();

    /********************
     *** Load JSON ***
     ********************/
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

    profilesData = await loadProfilesData();

    /*************************
     *** Generate Carousel ***
     *************************/
    const createJobItem = (job) => {
        const article = document.createElement("article");
        article.className = "jobs__item";
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

    const jobs = await loadJobsData();

    jobs.forEach((job) => {
        const jobItem = createJobItem(job);
        jobsContainer.appendChild(jobItem);
    });

    /****************************
     *** Initialize Slick ***
     ****************************/
    $(document).ready(() => {
        const $carousel = $("#carousel");
        const itemCount = $carousel.children().length;

        if (itemCount === 1) {
            $carousel.addClass("carousel--solo");
        } else if (itemCount === 2) {
            $carousel.addClass("carousel--duo");
        } else if (itemCount > 3) {
            $carousel.addClass("carousel--large");
        }

        $carousel.slick({
            centerMode: itemCount >= 3,
            centerPadding: "50px",
            slidesToShow: Math.min(3, itemCount),
            infinite: itemCount >= 3,
            arrows: true,
            prevArrow:
                '<button class="jobs__control jobs__control--prev" aria-label="Précédent"><i class="fa-solid fa-chevron-left"></i></button>',
            nextArrow:
                '<button class="jobs__control jobs__control--next" aria-label="Suivant"><i class="fa-solid fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "20px",
                    },
                },
            ],
        });
    });

    /*********************
     *** Email Helper ***
     *********************/
    const sendEmail = (email, subject, body) => {
        const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    /****************
     *** Modales ***
     ****************/
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
                <ul>${job.missions.map((mission) => `<li>${mission}</li>`).join("")}</ul>
            </div>
            <div class="jobs-modal__section">
                <h2 class="jobs-modal__section-title">Profil recherché</h2>
                <ul>
                    <li><strong>Expérience :</strong> ${job.profile.experience}</li>
                    <li><strong>Compétences :</strong> ${job.profile.skills}</li>
                    <li><strong>Langues :</strong> ${job.profile.languages}</li>
                </ul>
            </div>
            <button class="jobs-modal__button jobs__apply" data-id="${job.id}">Postuler</button>
        `;
    };

    const showModal = (modal, content) => {
        jobModalBody.innerHTML = content;
        modal.classList.remove("hidden");
        modal.style.visibility = "visible";
        modal.style.opacity = "1";

        const modalContent = modal.querySelector(".jobs-modal__content");
        modalContent.classList.add("show");
    };

    const hideModal = (modal) => {
        modal.classList.add("hidden");
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";

        const modalContent = modal.querySelector(".jobs-modal__content");
        modalContent.classList.remove("show");
    };

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("jobs__more")) {
            const jobId = parseInt(event.target.dataset.id, 10);
            const job = jobs.find((job) => job.id === jobId);

            if (job) {
                const modalContent = createModalContent(job);
                showModal(jobModal, modalContent);
            }
        } else if (event.target.classList.contains("jobs__apply")) {
            const jobId = parseInt(event.target.dataset.id, 10);
            const job = jobs.find((job) => job.id === jobId);

            if (job) {
                // TODO: mettre la bonne adresse
                const email = "recrutement@example.com"; // Adresse cible
                const subject = `Candidature pour le poste de ${job.title} - id: ${job.id}`;
                const body = `
Bonjour,

Je suis intéressé(e) par l'offre "${job.title}" publiée sur votre site.

Merci de me contacter pour discuter davantage de cette opportunité.

Cordialement,
[Votre nom]
                `.trim();

                sendEmail(email, subject, body);
            }
        }
    });

    const jobModalClose = jobModal.querySelector(".jobs-modal__close");
    const jobModalOverlay = jobModal.querySelector(".jobs-modal__overlay");

    jobModalClose.addEventListener("click", () => hideModal(jobModal));
    jobModalOverlay.addEventListener("click", () => hideModal(jobModal));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !jobModal.classList.contains("hidden")) {
            hideModal(jobModal);
        }
    });

    /****************
     *** Profiles ***
     ****************/

    //    const profileModal = document.getElementById("profile-detail-modal");
    const profileModalCarousel = profileModal.querySelector(".profile-modal__carousel");
    const closeModalButton = profileModal.querySelector(".profile-modal__close");
    //    const profileModalContent = profileModal.querySelector(".profile-modal__content");

    // Fonction pour créer le contenu du carousel
    const createProfileCarousel = (profiles) => {
        // Vider le carousel existant
        profileModalCarousel.innerHTML = "";

        profiles.forEach((profile) => {
            const profileHTML = `
        <div class="profile-modal__card" id="profile-${profile.id}">
            <h2 class="profile-modal__title">${profile.codeName}</h2>
            <p class="profile-modal__speciality"><strong>Speciality:</strong> ${
                profile.speciality
            }</p>
            
            <!-- Main Technologies -->
            <div class="profile-modal__section">
                <h3 class="profile-modal__section-title">Main Technologies</h3>
                <ul class="profile-modal__technologies">
                    ${profile.mainTechnologies
                        .map((tech) => `<li class="profile-modal__tech">${tech}</li>`)
                        .join("")}
                </ul>
            </div>

            <!-- Experience -->
            <div class="profile-modal__section">
                <h3 class="profile-modal__section-title">Experience</h3>
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
                <h3 class="profile-modal__section-title">Technical Skills</h3>
                <ul class="profile-modal__skills">
                    ${profile.technicalSkills
                        .map((skill) => `<li class="profile-modal__skill">${skill}</li>`)
                        .join("")}
                </ul>
            </div>

            <!-- Soft Skills -->
            <div class="profile-modal__section">
                <h3 class="profile-modal__section-title">Soft Skills</h3>
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
        </div>
    `;
            profileModalCarousel.innerHTML += profileHTML;
        });

        // Initialiser le carousel avec Slick
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

    // Ouvrir la modale et afficher le carousel
    const openProfileModal = (profiles) => {
        createProfileCarousel(profiles);
        profileModal.classList.remove("profile-modal--hidden");
        profileModal.style.visibility = "visible";
        profileModal.style.opacity = "1";
        profileModalContent.classList.add("show");
    };

    // Fermer la modale
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

    // Ajouter un événement au bouton de fermeture
    closeModalButton.addEventListener("click", closeProfileModal);

    // Ajouter un événement aux boutons de recherche
    document.querySelectorAll(".profiles__button").forEach((button) => {
        button.addEventListener("click", () => {
            const technology = button.previousElementSibling.textContent.trim();

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

    // Gestion du bouton "Contacter"
    profileModalCarousel.addEventListener("click", (event) => {
        if (event.target.classList.contains("profile-modal__contact-button")) {
            const email = event.target.dataset.email;
            const profileName = event.target.dataset.profile;
            const subject = `Intéressé par le profil : ${profileName}`;
            const body = `
Bonjour,

Je souhaite obtenir plus d'informations sur le profil "${profileName}".

Cordialement,
[Votre nom]
            `.trim();
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }
    });

    /************************
     *** Mentions légales ***
     ************************/

    const legalModal = document.getElementById("legal-modal");
    const legalOverlay = legalModal.querySelector(".legal__overlay");
    const legalClose = legalModal.querySelector(".legal__close");
    const legalLinks = document.querySelectorAll('a[href="#mentions-legales"]'); // Liens qui ouvrent la modale

    // Fonction pour afficher la modale
    const openLegalModal = () => {
        legalModal.classList.remove("legal--hidden");
        legalModal.style.visibility = "visible";
        legalModal.style.opacity = "1";

        const legalContent = legalModal.querySelector(".legal__content");
        legalContent.classList.add("show");
    };

    // Fonction pour masquer la modale
    const closeLegalModal = () => {
        legalModal.classList.add("legal--hidden");
        legalModal.style.visibility = "hidden";
        legalModal.style.opacity = "0";

        const legalContent = legalModal.querySelector(".legal__content");
        legalContent.classList.remove("show");
    };

    // Ajoute les événements pour ouvrir la modale
    legalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            openLegalModal();
        });
    });

    // Ajoute les événements pour fermer la modale
    legalOverlay.addEventListener("click", closeLegalModal);
    legalClose.addEventListener("click", closeLegalModal);

    // Fermer la modale avec la touche "Escape"
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !legalModal.classList.contains("legal--hidden")) {
            closeLegalModal();
        }
    });

    /*********************************
     *** Politique confidentialité ***
     *********************************/
    // Sélection des éléments de la modale "Politique de confidentialité"
    const privacyModal = document.getElementById("privacy-modal");
    const privacyOverlay = privacyModal.querySelector(".confidential__overlay");
    const privacyCloseButton = privacyModal.querySelector(".confidential__close");
    const privacyLinks = document.querySelectorAll("a[href='#politique-confidentialite']");

    // Fonction pour afficher la modale
    const showPrivacyModal = () => {
        privacyModal.classList.remove("confidential--hidden");
        privacyModal.style.visibility = "visible";
        privacyModal.style.opacity = "1";

        const privacyContent = privacyModal.querySelector(".confidential__content");
        privacyContent.classList.add("show");
    };

    // Fonction pour cacher la modale
    const hidePrivacyModal = () => {
        privacyModal.classList.add("confidential--hidden");
        privacyModal.style.visibility = "hidden";
        privacyModal.style.opacity = "0";

        const privacyContent = privacyModal.querySelector(".confidential__content");
        privacyContent.classList.remove("show");
    };

    // Écouteurs d'événements
    privacyLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            showPrivacyModal();
        });
    });

    privacyCloseButton.addEventListener("click", hidePrivacyModal);
    privacyOverlay.addEventListener("click", hidePrivacyModal);

    // Fermer la modale avec la touche Échap
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && privacyModal.style.visibility === "visible") {
            hidePrivacyModal();
        }
    });
});
