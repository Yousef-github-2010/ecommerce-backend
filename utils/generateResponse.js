const generateResponse = (status, message, data = null) => {
    return {
        status,
        message,
        data
    };
};

export default generateResponse;