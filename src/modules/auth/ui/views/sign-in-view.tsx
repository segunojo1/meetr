import { useRouter } from "next/navigation"
import { useState } from "react";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
});
export const SignInView = () => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>();
    return (
        <div>

        </div>
    )
}