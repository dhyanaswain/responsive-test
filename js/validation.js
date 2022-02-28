const firstNameEl = document.querySelector('#firstName');
const lastNameEl = document.querySelector('#lastName');
const titleEl = document.querySelector('#title');
const phoneEl = document.querySelector('#phone');
const emailEl = document.querySelector('#email');
const clientEl = document.querySelector('#client');

const form = document.querySelector('#contactUs');


const checkFirstName = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const firstName = firstNameEl.value.trim();

    if (!isRequired(firstName)) {
        showError(firstNameEl, 'First Name cannot be blank.');
    } else if (!isBetween(firstName.length, min, max)) {
        showError(firstNameEl, `First Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
};

const checkLastName = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const lastName = lastNameEl.value.trim();

    if (!isRequired(lastName)) {
        showError(lastNameEl, 'Last Name cannot be blank.');
    } else if (!isBetween(lastName.length, min, max)) {
        showError(lastNameEl, `Last Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
};

const checkTitle = () => {
    let valid = false;
    const min = 6,
        max = 25;
    const title = titleEl.value.trim();

    if (!isRequired(title)) {
        showError(titleEl, 'Title cannot be blank.');
    } else if (!isBetween(title.length, min, max)) {
        showError(titleEl, `Title must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(titleEl);
        valid = true;
    }
    return valid;
};

const checkPhoneNumber = () => {
    let valid = false;
    const phone = phoneEl.value.trim();
    const regx = /^[6-9]\d{9}$/;

    if (regx.test(phone)) {
        showSuccess(phoneEl);
        valid = true;
    } else if (!isRequired(phone)) {
        showError(phoneEl, 'Phone number cannot be blank.');
    } else {
        showError(phoneEl, `Phone number is not valid.`);
    }
    return valid;
}

const checkEmailAddress = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkClient = () => {
    let valid = false;
    const client = clientEl.value.trim();

    if (!isRequired(client)) {
        showError(clientEl, 'Client cannot be blank.');
    } else {
        showSuccess(clientEl);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function(e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isFirstNameValid = checkFirstName(),
        isLastnameValid = checkLastName(),
        isTitleValid = checkTitle(),
        isPhoneNumberValid = checkPhoneNumber(),
        isEmailValid = checkEmailAddress(),
        isClientValid = checkClient();

    let isFormValid = isFirstNameValid &&
        isLastnameValid &&
        isTitleValid &&
        isPhoneNumberValid &&
        isEmailValid &&
        isClientValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        alert('Form Submited')
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function(e) {
    switch (e.target.id) {
        case 'firstName':
            checkFirstName();
            break;
        case 'lastName':
            checkLastName();
            break;
        case 'title':
            checkTitle();
            break;
        case 'phone':
            checkPhoneNumber();
            break;
        case 'email':
            checkEmailAddress();
            break;
        case 'client':
            checkClient();
            break;
    }
}));