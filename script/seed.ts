const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try{
        await db.category.createMany({
            data: [
                {name: "Computer Science"},
                {name: "Programming"},
                {name: "Framework Development"},
                {name: "Design"},
            ],
            skipDuplicates: true,
        });
        await db.category.updateMany({
            where: { name: "Design" },
            data: { name: "Graphic Design" },
        });
        console.log("Successfully created category")
    }catch(error){
        console.log("Error seeding the database categories", error);
    }finally{
        await db.$disconnect();
    }
}

main();