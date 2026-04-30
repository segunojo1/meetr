import z from "zod";

export const agentsInsertSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    instructions: z.string().max(200, {message: "Instructions must be less than 200 characters"})
})