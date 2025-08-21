const notEditableFieldError = (res, allowedFields) => {
    return res
        .status(500)
        .send(
            `One or more fields are not editable.\nEditable fields: ${allowedFields}`
        );
};

const generalError = (res, message) => {
    return res.status(500).send(message);
};

export { notEditableFieldError, anotherFunction };
