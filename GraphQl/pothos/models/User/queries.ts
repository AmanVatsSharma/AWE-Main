import builder from "../../builder";
import db from "../../db";

builder.prismaObject("Product", {
    name: "Product",
    fields: (t) => ({
        id: t.exposeID("id"),
        name: t.exposeString("name"),
        price: t.exposeFloat("price"),
    }),
});

// builder.queryFields((t) => ({
//     getUser: t.prismaField({
//         type: "User",
//         args: {
//             userId: t.arg.string({ required: true }),
//         },
//         resolve: async (query, _, args) => {
//             const user = await db.user.findUnique({
//                 ...query,
//                 where: { id: args?.userId },
//             });

//             if (!user) {
//                 throw new Error("User not found");
//             }

//             return user;
//         },
//     }),
//     getUsers: t.prismaField({
//         type: ["User"],
//         resolve: (query) => db.user.findMany(query),
//     }),
// }));