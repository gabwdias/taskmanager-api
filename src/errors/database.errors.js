const notFoundError = (res, message) => {
    console.log("Error handling");
    if (message) {
        return res.status(404).send(message);
    }
    return res.status(404).send("Entry not found");
};

export default notFoundError;
