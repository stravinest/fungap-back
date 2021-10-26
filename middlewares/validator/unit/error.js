module.exports = (req, error) => {
    console.log(`METHOD: ${req.method}, URL: ${req.originalUrl}, Error: ${error}`);
}