module.exports = function(app) {
    app.use("/", require('./form')),
    app.use("/api/v1/", require("./confirm-email"));
}