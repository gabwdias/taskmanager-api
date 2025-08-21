const notFoundError = (res, message) => {
    if (message) {
        return res.status(404).send(message);
    }
    return res.status(404).send("Entry not found");
};

export default notFoundError;
