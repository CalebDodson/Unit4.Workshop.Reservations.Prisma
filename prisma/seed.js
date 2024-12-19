const prisma = require("../prisma");

const seed = async () => {
    const createCustomers = async () => {
        const customers = [
            { name: "Odin" },
            {  name: "Dino" },
            {  name: "Winston" },
            {  name: "Penny" }
        ];
        await prisma.customer.createMany({ data: customers });
    };

    const createRestaurants = async () => {
        const restaurants = [
            { name: "Cane's" },
            { name: "Chick-fil-A" },
            { name: "McDonald's" },
            { name: "Wendy's" },
            { name: "Whataburger" }
        ];
        await prisma.restaurant.createMany({ data: restaurants });
    };

    const createReservations = async () => {
        const reservations = [
            { customerId: 1, restaurantId: 1, partyCount: 2, date: new Date("2024-12-19T15:30:00Z") },
            { customerId: 2, restaurantId: 2, partyCount: 5, date: new Date("2024-12-20T15:30:00Z") },
            { customerId: 3, restaurantId: 3, partyCount: 1, date: new Date("2024-12-24T15:30:00Z") },
            { customerId: 4, restaurantId: 4, partyCount: 5, date: new Date("2024-12-25T15:30:00Z") },
        ];
        await prisma.reservation.createMany({ data: reservations });
    };
    
    await createCustomers();
    await createRestaurants();
    await createReservations();

};
seed()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
    });