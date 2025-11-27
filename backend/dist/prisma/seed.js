import { prisma } from "./index.js";
async function main() {
    await prisma.user.create({
        data: {
            name: "admin",
            email: "admin@gmail.com",
            password: "admin@123"
        }
    });
}
main();
//# sourceMappingURL=seed.js.map