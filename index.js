const express = require('express');
const PORT = process.env.PORT || 5000;
const authRouter = require('./routers/authRouter')
const descriptionUsersRouter = require('./routers/descriptionUsersRouter')
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/desc", descriptionUsersRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://porohin1995:Vlad70003@cluster0.s1hrxew.mongodb.net/?retryWrites=true&w=majority');
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));

    } catch (e) {
        console.log(e);
    }
}


start();
