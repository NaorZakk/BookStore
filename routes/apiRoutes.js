const models = require("../models/index");

module.exports = function(app) {
    //  read
    app.get("/api/genres", async (req, res) => {
        const genres = await models.Genre.findAll();

        res.status("200").json(genres);
    });

    //  read
    app.get("/api/books/:ISBN", async (req, res) => {
        const book = await models.Book.findOne({
            where: { ISBN: req.params.ISBN }
        });

        res.status("200").json(book);
    });


    //  update
    app.put("/api/books/:ISBN", async (req, res) => {

        const sentBook = req.body;

        const book = await models.Book.findOne({
            where: { ISBN: sentBook.ISBN },
        });

        await book.update({ ...sentBook})

        res.status("200").json(book);
    });

    //  read
    app.get("/api/books", async (req, res) => {
        const books = await models.Book.findAll({
            include: [
                {
                    model: models.Genre
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status("200").json(books);
    });

    //  delete
    app.delete("/api/books/:ISBN", async (req, res) => {
        try {
            const book = await models.Book.findOne({
                where: { ISBN: req.params.ISBN }
            });

            if (!book) {
                res.status("404").json({ message: "book not found" });
            }

            book.destroy();

            res.status("200").json(book);
        } catch (err) {
            res.status("500").json({ messge: "server error" });
        }
    });

    //  create
    app.post("/api/books", async (req, res) => {
        const sentBook = req.body;

        const [book, created] = await models.Book.findOrCreate({
            where: { ISBN: sentBook.ISBN },
            defaults: { ...sentBook, createdAt: new Date() }
        });

        if (!created) {
            res.status("409").json({ message: "ISBN already exists." });
        }

        res.status("200").json(book);
    });
}