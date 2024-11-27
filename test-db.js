const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const todos = await prisma.todo.findMany();
    console.log(todos);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
