const notFoundError = (res, message) => {
    if (message) {
        return res.status(404).send(message);
    }
    return res.status(404).send("Entry not found");
};

const invalidIDError = (res) => {
    return res.status(500).send("The provided ID is not valid");
};

export { notFoundError, invalidIDError };
