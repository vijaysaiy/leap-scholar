const App = {
  data: {
    preferredIntake: [
      { name: "Jan 2025", key: "jan-2025" },
      { name: "May/Sep 2025", key: "may-sep" },
      { name: "2026 Intake", key: "next-year" },
    ],
    courses: [
      { name: "PG Diploma", key: "diploma" },
      { name: "Master's", key: "masters" },
      { name: "Bachelor's", key: "bachelors" },
      { name: "MBA", key: "mba" },
      { name: "PhD", key: "phd" },
      { name: "Not decided", key: "undecided" },
    ],
    levelOfEducation: [
      {
        name: "10th Standard",
        key: "10",
      },
      {
        name: "12th Standard",
        key: "12",
      },
      {
        name: "Bachelor's Degree",
        key: "bachelors",
      },
      {
        name: "Master's Degree",
        key: "masters",
      },
      {
        name: "MBBS / MD",
        key: "mbbs/md",
      },
    ],
    graduationYears: [
      { name: "2023 or later", key: "2023orLater" },
      { name: "2022", key: "2022" },
      { name: "2021", key: "2021" },
      { name: "2020", key: "2020" },
      { name: "2019", key: "2019" },
      { name: "2018", key: "2018" },
      { name: "2017", key: "2017" },
      { name: "2016", key: "2016" },
      { name: "2015", key: "2015" },
      { name: "2014", key: "2014" },
      { name: "2013", key: "2013" },
      { name: "2012", key: "2012" },
      { name: "2011", key: "2011" },
      {
        name: "Before 2011",
        key: "before2011",
      },
    ],

    passportLevels: [
      {
        name: "Yes",
        key: "yes",
      },
      {
        name: "Applied",
        key: "applied",
      },
      {
        name: "No",
        key: "no",
      },
    ],
    languageExamStatus: [
      {
        name: "Not decided",
        key: "not_decided",
      },
      {
        name: "Already gave the exam",
        key: "given",
      },
      {
        name: "Booked my exam",
        key: "booked",
      },
      {
        name: "Planning to give the exam in next 2 months",
        key: "planning",
      },
    ],
    cityDropdown: [
      {
        name: "Bangalore Rural, Karnataka",
        key: "bgl_r_k",
      },
      {
        name: "Bangalore Urbar, Karnataka",
        key: "bgl_u_k",
      },
      {
        name: "Bengaluru, Karnataka",
        key: "bgl_k",
      },
      {
        name: "Chennai, Tamilnadu",
        key: "ch_t",
      },
      {
        name: "Ludhiana, Punjab",
        key: "ldh_pn",
      },
      {
        name: "Pune Division, Maharastra",
        key: "pune_d_mh",
      },
      {
        name: "Pune, Maharastra",
        key: "pune_mh",
      },
    ],
  },

  state: {
    selectedCountry: "uk",
    preferredIntake: null,
    courseToPursue: null,
    highestLevelEducation: null,
    grade: null,
    yearOfGraduation: null,
    hasValidPassport: null,
    languageExamStatus: null,
    haveUniversityAdmin: null,
    currentCity: null,
  },

  currentStep: 1,
  steps: {},

  init() {
    this.steps = {
      1: this.renderIntakeDetails.bind(this),
      2: this.renderEducationDetails.bind(this),
      3: this.renderLanguageDetails.bind(this),
      4: this.renderStudentDetails.bind(this),
    };
    this.renderer();
    document
      .getElementById("continue-btn")
      .addEventListener("click", this.handleContinue.bind(this));

    document
      .getElementById("back")
      .addEventListener("click", this.handleBack.bind(this));
  },

  renderer() {
    // First, clear any content from all steps
    this.clearAllSteps();
    this.updateProgress();

    // Render current step
    const stepFunction = this.steps[this.currentStep];
    if (stepFunction) stepFunction();
  },

  handleContinue() {
    if (this.currentStep < Object.keys(this.steps).length) {
      this.currentStep++;
      this.renderer();
    }
  },

  handleBack() {
    if (this.currentStep > 1) {
      // Clear the state of the current step
      this.clearCurrentStepState();

      // Navigate to the previous step
      this.currentStep--;
      this.renderer();
    }
  },

  clearAllSteps() {
    // Clear the content of all steps
    const stepIds = [
      "country",
      "intake",
      "courses",
      "language-details",
      "student-details",
    ];
    stepIds.forEach((id) => {
      const stepContainer = document.getElementById(id);
      if (stepContainer) {
        stepContainer.innerHTML = "";
      }
    });
  },

  clearCurrentStepState() {
    switch (this.currentStep) {
      case 1:
        this.state.selectedCountry = null;
        break;
      case 2:
        this.state.preferredIntake = null;
        break;
      case 3:
        this.state.courseToPursue = null;
        break;
      case 4:
        this.state.languageExamStatus = null;
        break;
      case 5:
        this.state.currentCity = null;
        break;
      default:
        break;
    }
  },

  updateProgress() {
    const progressDiv = document.getElementById("progress");
    progressDiv.style.width = (this.currentStep / 5) * 100 + "%";
  },
  updateContinueButton(isEnabled) {
    const continueBtn = document.getElementById("continue-btn");
    continueBtn.disabled = !isEnabled;
  },

  createDropdown(options, placeholder, onSelect) {
    const container = document.createElement("div");
    container.style.position = "relative";

    const input = document.createElement("div");
    input.innerHTML = `<span>${placeholder}</span> <i class="fa fa-chevron-down"></i>`; // Add Font Awesome chevron
    input.className = "dropdown";
    input.style.cursor = "pointer";

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";

    options.forEach((option) => {
      const optionElement = document.createElement("span");
      optionElement.textContent = option.name;
      optionElement.style.cursor = "pointer"; // Add pointer cursor for options
      optionElement.addEventListener("click", () => {
        onSelect(option.key); // Notify parent of the selected value
        input.innerHTML = `${option.name} <i class="fa fa-chevron-down"></i>`; // Update input with selected value and chevron
        dropdownContent.classList.remove("show"); // Close dropdown
      });
      dropdownContent.appendChild(optionElement);
    });

    container.appendChild(input);
    container.appendChild(dropdownContent);

    input.addEventListener("click", () => {
      dropdownContent.classList.toggle("show"); // Toggle dropdown visibility
    });

    document.addEventListener("click", (event) => {
      if (!container.contains(event.target)) {
        dropdownContent.classList.remove("show"); // Close dropdown if clicked outside
      }
    });

    return container;
  },

  createCard(content, isActive, onClick, isLarge = false) {
    const card = document.createElement("div");
    card.className = `pill ${isActive ? "active" : ""} ${
      isLarge ? "card-lg" : ""
    }`;
    card.innerHTML = content;
    card.addEventListener("click", onClick);
    return card;
  },

  renderIntakeDetails() {
    const container = document.getElementById("intake");
    container.innerHTML = `<p class='heading'>What's your preferred intake?</h2>`;

    const intakeGrid = document.createElement("div");
    intakeGrid.className = "country-grid";

    this.data.preferredIntake.forEach((intake) => {
      const card = this.createCard(
        `<div>${intake.name}</div>`,
        this.state.preferredIntake === intake.key,
        () => {
          this.state.preferredIntake = intake.key;
          this.renderIntakeDetails();
          this.updateContinueButton(!!this.state.preferredIntake);
        }
      );
      intakeGrid.appendChild(card);
    });

    container.appendChild(intakeGrid);

    // Add a heading for courses below the intake section
    const courseHeading = document.createElement("p");
    courseHeading.className = "heading";
    courseHeading.textContent = "What do you wish to pursue?";
    container.appendChild(courseHeading);

    // Render the course options
    const courseGrid = document.createElement("div");
    courseGrid.className = "country-grid";

    this.data.courses.forEach((course) => {
      const card = this.createCard(
        `<div>${course.name}</div>`,
        this.state.courseToPursue === course.key,
        () => {
          this.state.courseToPursue = course.key;
          this.renderIntakeDetails(); // Re-render to reflect changes
          this.updateContinueButton(!!this.state.courseToPursue);
        }
      );
      courseGrid.appendChild(card);
    });

    container.appendChild(courseGrid);

    this.updateContinueButton(
      !!this.state.preferredIntake && !!this.state.courseToPursue
    );
  },

  renderEducationDetails() {
    const container = document.getElementById("courses");
    container.innerHTML = "";
    container.innerHTML = `<p class='heading'>What's your highest level of education?</h2>`;

    const intakeGrid = document.createElement("div");
    intakeGrid.className = "country-grid";

    this.data.levelOfEducation.forEach((course) => {
      const card = this.createCard(
        `<div>${course.name}</div>`,
        this.state.highestLevelEducation === course.key,
        () => {
          this.state.highestLevelEducation = course.key;
          this.renderEducationDetails();
          this.updateContinueButton(!!this.state.highestLevelEducation);
        }
      );

      intakeGrid.appendChild(card);
    });

    container.appendChild(intakeGrid);

    // Add a heading for gained percentage
    const percentageHeading = document.createElement("p");
    percentageHeading.className = "heading";

    percentageHeading.textContent = "Expected or Gained Percentage";
    container.appendChild(percentageHeading);

    // Render percentage field
    const percentageField = document.createElement("input");
    percentageField.setAttribute("placeholder", "Grades");
    container.appendChild(percentageField);

    // Add a heading for graduation year
    const graduationYear = document.createElement("p");
    graduationYear.className = "heading";

    graduationYear.textContent = "Year of graduation?";
    container.appendChild(graduationYear);

    // Use the reusable dropdown component
    const dropdown = this.createDropdown(
      this.data.graduationYears,
      "Year of graduation",
      (selectedKey) => {
        this.state.yearOfGraduation = selectedKey;
        this.updateContinueButton(!!this.state.yearOfGraduation);
      }
    );
    container.appendChild(dropdown);

    // Add a heading for passport availability
    const passportHeading = document.createElement("p");
    passportHeading.className = "heading";
    passportHeading.textContent = "Do you have a valid Passport?";
    container.appendChild(passportHeading);

    // render passport availability options
    const passportGrid = document.createElement("div");
    passportGrid.className = "country-grid";

    this.data.passportLevels.forEach((option) => {
      const card = this.createCard(
        `<div>${option.name}</div>`,
        this.state.hasValidPassport === option.key,
        () => {
          this.state.hasValidPassport = option.key;
          this.renderEducationDetails(); // Re-render to reflect changes
          this.updateContinueButton(!!this.state.hasValidPassport);
        }
      );
      passportGrid.appendChild(card);
    });

    container.appendChild(passportGrid);
  },
  renderLanguageDetails() {
    const container = document.getElementById("language-details");
    container.innerHTML = "";
    container.style.maxWidth = "600px";

    container.innerHTML =
      "<p class='heading'>IELTS/TOEFL/PTE/Duolingo status</h2>";
    // render year of graduation dropdown
    const languageStatusDropdown = this.createDropdown(
      this.data.languageExamStatus,
      "IELTS/TOEFL/PTE/Duolingo status*",
      (selectedKey) => {
        this.state.languageExamStatus = selectedKey;
        this.updateContinueButton(!!this.state.languageExamStatus);
      }
    );
    container.appendChild(languageStatusDropdown);
    // heading for university admit
    const universityAdmitHeading = document.createElement("p");
    universityAdmitHeading.className = "heading"
    universityAdmitHeading.textContent = "Do you have a university admit?";
    container.appendChild(universityAdmitHeading);
    
    const universityAdmitGrid = document.createElement("div");
    universityAdmitGrid.className = "country-grid";
    universityAdmitGrid.style.display = "flex";

    const yesCard = this.createCard(
      "<div>Yes</div>",
      this.state.haveUniversityAdmin === true,
      () => {
        this.state.haveUniversityAdmin = true;
        this.renderLanguageDetails();
        this.updateContinueButton(this.state.haveUniversityAdmin !== null);
      }
    );
    const noCard = this.createCard(
      "<div>No</div>",
      this.state.haveUniversityAdmin === false,
      () => {
        this.state.haveUniversityAdmin = false;
        this.renderLanguageDetails();
        this.updateContinueButton(this.state.haveUniversityAdmin !== null);
      }
    );
    universityAdmitGrid.appendChild(yesCard);
    universityAdmitGrid.appendChild(noCard);

    container.appendChild(universityAdmitGrid);
    // current city
    const currentCityHeading = document.createElement("p");
    currentCityHeading.className = "heading"
    currentCityHeading.textContent = "What is your current city?";
    container.appendChild(currentCityHeading);

    const cityDropdown = this.createDropdown(
      this.data.cityDropdown,
      "E.g Delhi",
      (selectedKey) => {
        this.state.currentCity = selectedKey;
        this.updateContinueButton(!!this.state.currentCity);
      }
    );
    cityDropdown.style.marginBottom = "2rem";
    container.appendChild(cityDropdown);
  },

  renderStudentDetails() {
    const container = document.getElementById("student-details");
    container.innerHTML = "";

    container.innerHTML =
      "<p class='heading'>Just one last step! Provide your details to start your study abroad journey </h2>";

    const studentForm = document.createElement("div");
    studentForm.className = "student-form";

    const nameField = document.createElement("input");
    nameField.type = "text";
    nameField.placeholder = "Name";

    const emailField = document.createElement("input");
    emailField.type = "email";
    emailField.placeholder = "Email";

    const phoneField = document.createElement("input");
    phoneField.type = "text";
    phoneField.placeholder = "Phone*";

    studentForm.appendChild(nameField);
    studentForm.appendChild(emailField);
    studentForm.appendChild(phoneField);

    container.appendChild(studentForm);

    const continueBtn = document.getElementById("continue-btn");
    continueBtn.textContent = "Start your study abroad journey";
  },
};

App.init();
