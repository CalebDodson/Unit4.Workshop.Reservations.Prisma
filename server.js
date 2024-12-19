const express = require("express");
const app = express();

const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/customers", async(req, res, next) => {
    try {
        const customers = await prisma.customer.findMany();
        res.json(customers);

    } catch (error) {
        next();
    }
});

app.get("/api/restaurants", async(req, res, next) => {
    try {
        const restaurants = await prisma.restaurant.findMany();
        res.json(restaurants);

    } catch (error) {
        next();
    }
});

app.get("/api/reservations", async(req, res, next) => {
    try {
        const reservations = await prisma.reservation.findMany();
        res.json(reservations);

    } catch (error) {
        next();
    }
});

app.post("/api/customers/:id/reservations", async(req, res, next) => {
    try {
        const id = +req.params.id;
        
        const reservationExists = await prisma.vacation.findFirst({ where: { id } });

        if (!reservationExists) {
            return next({
                status: 404,
                message: `Could not find reservation with id ${id}.`
            });
        }

        await prisma.reservation.delete({ where: { id } });
        res.sendStatus(204);

    } catch (error) {
        next();
    };
});

app.delete("/api/customers/:customerId/reservations/:id", async(req, res, next) => {
    try {
        const customerId = +req.params.customerId;
        const reservationId = +req.params.id;

        const deletedReservation = await prisma.reservation.deleteMany({
            where: {
                id: reservationId,
                customerId: customerId
            }
        });

        res.status(204).json();
    } catch (error) {
        next();
    };
});

app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status ?? 500;
    const message = err.message ?? "Internal server error.";
    res.status(status).json({message});
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});