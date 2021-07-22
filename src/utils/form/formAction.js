export const validate = element => {
    let error = [true, ''];

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    return error;
};

export const update = (element, formdata) => {
    const newFormdata = {
        ...formdata,
    };
    const newElement = {
        ...newFormdata[element.id],
    };

    newElement.checked = element.event.target.checked;
    newElement.value = element.event.target.value;

    if (element.blur) {
        const validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;
    return newFormdata;
};

export const generateData = formdata => {
    const dataToSubmit = {};
    for (const key in formdata) {
        dataToSubmit[key] = formdata[key].value;
    }
    return dataToSubmit;
};

export const isFormValid = formdata => {
    let formIsValid = true;

    for (const key in formdata) {
        formIsValid =
            (formdata[key].valid || formdata[key].value !== '') && formIsValid;
    }
    return formIsValid;
};
