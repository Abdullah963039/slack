import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { SignUpValues, signUpSchema } from "./validation";

interface SignUpFormProps {
  disabled?: boolean;
  onSubmit: (values: SignUpValues) => void;
}

export const SignUpForm = ({ disabled, onSubmit }: SignUpFormProps) => {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", name: "" },
  });

  const pending = form.formState.isSubmitting || disabled;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <Input disabled={pending} placeholder="Full name" {...field} />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <Input
                disabled={pending}
                placeholder="Email"
                type="email"
                {...field}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <Input
                disabled={pending}
                placeholder="Password"
                type="password"
                {...field}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <Input
                disabled={pending}
                placeholder="Confirm Password"
                type="password"
                {...field}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button disabled={pending} type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};
