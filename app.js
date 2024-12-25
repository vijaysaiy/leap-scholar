// Application State
const state = {
  page: 1,
  data: {
    selectedCountry: "uk",
    preferredIntake: null,
    courseToPursue: null,
    highestLevelEducation: null,
    grade: null,
    yearOfGraduation: null,
    hasValidPassport: null,
    languageExamStatus: null,
    hasUniversityAdmit: null,
    currentCity: null,
    name: null,
    email: null,
    phone: null,
  },
  errors: {},
};

// Pages with Inputs
const pages = [
  {
    page: 1,
    inputs: [
      {
        name: "preferredIntake",
        type: "pills",
        label: "What's your preferred intake?",
        options: [
          { name: "Jan 2025", key: "jan-2025" },
          { name: "May/Sep 2025", key: "may-sep" },
          { name: "2026 Intake", key: "next-year" },
        ],
        validator: (value) => value.length > 0 || "Select preferred intake",
      },
      {
        name: "courseToPursue",
        type: "pills",
        label: "What do you wish to pursue?",
        options: [
          { name: "PG Diploma", key: "diploma" },
          { name: "Master's", key: "masters" },
          { name: "Bachelor's", key: "bachelors" },
          { name: "MBA", key: "mba" },
          { name: "PhD", key: "phd" },
          { name: "Not decided", key: "undecided" },
        ],
        validator: (value) => value.length > 0 || "Select preferred intake",
      },
    ],
  },
  {
    page: 2,
    inputs: [
      {
        name: "highestLevelEducation",
        type: "pills",
        label: "What's your highest level of education?",
        options: [
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
        validator: (value) => value.length > 0 || "Select level of education",
      },
      {
        name: "grade",
        type: "text",
        placeholder: "Grade",
        label: "Expected or Gained percentage",
        validator: (value) => value.trim() !== "" || "Enter grade/percentage",
      },
      {
        name: "yearOfGraduation",
        type: "dropdown",
        label: "Year of graduation?",
        options: [
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
        validator: (value) => value !== "" || "Rating is required",
      },
      {
        name: "hasValidPassport",
        type: "pills",
        label: "Do you have a valid Passport?",
        options: [
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
        validator: (value) => value.length > 0 || "This is a mandatory field",
      },
    ],
  },
  {
    page: 3,
    inputs: [
      {
        name: "languageExamStatus",
        type: "dropdown",
        label: "IELTS/TOEFL/PTE/Duolingo status",
        options: [
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
        validator: (value) => value !== "" || "This is mandatory",
      },
      {
        name: "hasUniversityAdmit",
        type: "pills",
        label: "Do you already have a university admit?",
        options: [
          { name: "Yes", key: "y" },
          { name: "No", key: "n" },
        ],
        validator: (value) => value.length > 0 || "This is a mandatory field",
      },
      {
        name: "currentCity",
        type: "dropdown",
        label: "What is your current city?",
        options: [
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
        validator: (value) => value !== "" || "This is mandatory",
      },
    ],
  },
  {
    page: 4,
    inputs: [
      {
        label:
          "Just one last step! Provide your details to start your study abroad journey",
        name: "name",
        type: "text",
        placeholder: "Name*",
        validator: (value) => value.trim() !== "" || "Name is required",
      },
      {
        name: "email",
        type: "email",
        placeholder: "Email*",
        validator: (value) =>
          /\S+@\S+\.\S+/.test(value) || "Invalid email address",
      },
      {
        name: "phone",
        type: "text",
        placeholder: "Phone*",
        validator: (value) =>
          /^\+?\d{10,15}$/.test(value) || "Invalid phone number",
      },
    ],
  },
];

// Render App
const renderApp = () => {
  updateProgress();
  const appDiv = document.getElementById("app");
  const activeElement = document.activeElement;
  const activeElementName = activeElement ? activeElement.name : null;

  // Save the current input value to restore after rendering
  const activeValue = activeElement ? activeElement.value : null;

  appDiv.innerHTML = "";
  const currentPage = pages[state.page - 1];
  const form = document.createElement("form");

  // Render Inputs
  currentPage.inputs.forEach((input) => {
    const fieldDiv = document.createElement("div");
    fieldDiv.className = "form-item";
    const label = document.createElement("label");
    label.textContent = input.label;

    let inputElement;
    if (input.type === "textarea") {
      inputElement = document.createElement("textarea");
      inputElement.value = state.data[input.name] || "";
    } else if (input.type === "dropdown") {
      inputElement = renderCustomDropdown(input);
    } else if (input.type === "pills") {
      inputElement = document.createElement("div");
      inputElement.className = "pill-container";
      input.options.forEach((option) => {
        const pill = document.createElement("div");
        pill.textContent = option.name;
        pill.className = `pill ${
          state.data[input.name] === option.key ? "selected" : ""
        }`;
        pill.onclick = () => {
          state.data[input.name] =
            state.data[input.name] === option.key ? "" : option.key; // Toggle selection
          state.errors[input.name] = ""; // Clear error for this input
          renderApp();
        };
        inputElement.appendChild(pill);
      });
    } else {
      inputElement = document.createElement("input");
      inputElement.type = input.type;
      inputElement.placeholder = input.placeholder ?? "";
      inputElement.value = state.data[input.name] || "";
    }

    inputElement.name = input.name;
    inputElement.oninput = (e) => {
      state.data[input.name] = e.target.value;
      state.errors[input.name] = "";
      renderApp();
    };

    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = state.errors[input.name] || "";

    input.label && fieldDiv.appendChild(label);
    fieldDiv.appendChild(inputElement);
    state.errors[input.name] && fieldDiv.appendChild(errorDiv);
    form.appendChild(fieldDiv);
  });

  // Navigation
  addNavigation(form);
  appDiv.appendChild(form);

  // Restore focus to the previously focused element
  if (activeElementName) {
    const restoredElement = document.getElementsByName(activeElementName)[0];
    if (restoredElement && document.body.contains(restoredElement)) {
      restoredElement.focus();
      if (restoredElement.setSelectionRange && activeValue) {
        restoredElement.setSelectionRange(
          activeValue.length,
          activeValue.length
        );
      }
    }
  }
};

//  Custom Dropdown
const renderCustomDropdown = (input) => {
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = "70%";
  const selectedOption = input.options.find(
    (option) => option.key === state.data[input.name]
  );
  const placeholder = selectedOption?.name || "Select an option";

  const inputEl = document.createElement("div");
  inputEl.innerHTML = `<span>${placeholder}</span> <i class="fa fa-chevron-down"></i>`; // Add Font Awesome chevron
  inputEl.className = "dropdown";
  inputEl.style.cursor = "pointer";
  container.appendChild(inputEl);

  const dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";
  input.options.forEach((option) => {
    const optionElement = document.createElement("span");
    const isSelectedOption = state.data[input.name] === option.key;
    if (isSelectedOption) {
      optionElement.className = "dropdown-selected";
    }
    optionElement.textContent = option.name;
    optionElement.onclick = () => {
      state.data[input.name] = option.key;
      state.errors[input.name] = "";
      renderApp();
    };
    dropdownContent.appendChild(optionElement);
  });

  container.appendChild(dropdownContent);

  inputEl.addEventListener("click", () => {
    dropdownContent.classList.toggle("show"); // Toggle dropdown visibility
  });

  document.addEventListener("click", (event) => {
    if (!container.contains(event.target)) {
      dropdownContent.classList.remove("show"); // Close dropdown if clicked outside
    }
  });
  return container;
};

// Add Navigation
const addNavigation = (form) => {
  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  backButton.id = "back-btn";
  backButton.type = "button";
  backButton.onclick = () => {
    if (state.page > 1) {
      state.page--;
      renderApp();
    }
  };

  const backIcon = document.createElement("i");
  backIcon.classList.add("fa", "fa-arrow-left");
  backButton.prepend(backIcon);

  if (state.page > 1) form.appendChild(backButton);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.type = "button";
  nextButton.id = "next-btn";
  nextButton.onclick = () => {
    const currentPage = pages[state.page - 1];
    let isValid = true;

    if (currentPage.inputs) {
      currentPage.inputs.forEach((input) => {
        const value =
          state.data[input.name] || (input.type === "pills" ? [] : "");
        const validation = input.validator(value);
        if (validation !== true) {
          isValid = false;
          state.errors[input.name] = validation;
        }
      });
    }

    if (isValid) {
      if (state.page < pages.length) {
        state.page++;
      }
    }
    renderApp();
  };

  const nextIcon = document.createElement("i");
  nextIcon.classList.add("fa", "fa-arrow-right");
  nextIcon.style.marginLeft = "8px";
  nextButton.appendChild(nextIcon);

  if (state.page < pages.length) form.appendChild(nextButton);

  if (state.page === pages.length) form.appendChild(submitButton());
};

const submitButton = () => {
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Start your onboarding journey";
  submitBtn.id = "submit-btn";
  submitBtn.type = "button";

  const nextIcon = document.createElement("i");
  nextIcon.classList.add("fa", "fa-arrow-right");
  nextIcon.style.marginLeft = "8px";
  submitBtn.appendChild(nextIcon);

  submitBtn.onclick = () => {
    const currentPage = pages[state.page - 1];
    let isValid = true;

    if (currentPage.inputs) {
      currentPage.inputs.forEach((input) => {
        const value =
          state.data[input.name] || (input.type === "pills" ? [] : "");
        const validation = input.validator(value);
        if (validation !== true) {
          isValid = false;
          state.errors[input.name] = validation;
        }
      });
    }

    if (isValid) {
      // handle submit logic, api call
      console.log(state.data)
      alert("submitted");
    }
    renderApp();
  };
  return submitBtn;
};

const updateProgress = () => {
  const progressDiv = document.getElementById("progress");
  progressDiv.style.width = (state.page / 5) * 100 + "%";
};

// init
renderApp();
