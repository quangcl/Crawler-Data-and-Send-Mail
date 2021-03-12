module.exports = function(app) {
    app.use("/api/v1/", require("./confirm-email"));
}