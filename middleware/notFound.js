const notFound = (req, res, next) => {
    const error = new Error("error : not found");
    res.status(404);
    next(error);
};

export default notFound