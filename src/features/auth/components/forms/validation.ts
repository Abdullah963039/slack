import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/;

export type SignInValues = z.infer<typeof signInSchema>;
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email must be provided")
    .email("Invalid email format."),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export const signUpSchema = signInSchema
  .extend({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, "Too short name"),
    confirmPassword: z.string({
      required_error: "Please confirm your password",
    }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password is too short.")
      .regex(PASSWORD_REGEX, {
        message:
          "Password must contains special, capital, small charectars and numbers",
      }),
  })
  .refine((values) => values.confirmPassword === values.password, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });
