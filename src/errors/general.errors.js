const notEditableFieldError = (res, allowedFields, message) => {
    if (message) {
        return res.status(500).send(message);
    }
    return res
        .status(500)
        .send(
            `One or more fields are not editable.\nEditable fields: ${allowedFields}`
        );
};

const anotherFunction = () => {};

export { notEditableFieldError, anotherFunction };
