"use client";

import * as React from "react";

import type { UseFormReturn } from "@/lib/simple-form";
import { cn } from "@/lib/utils";

type FormContextValue = UseFormReturn<Record<string, string>>;

const FormContext = React.createContext<FormContextValue | null>(null);
const FormFieldContext = React.createContext<{ name: string } | null>(null);

function Form<TValues extends Record<string, string>>({
  children,
  ...form
}: React.PropsWithChildren<UseFormReturn<TValues>>) {
  return (
    <FormContext.Provider value={form as unknown as FormContextValue}>
      {children}
    </FormContext.Provider>
  );
}

type FormFieldProps<TValues extends Record<string, string>> = {
  control?: UseFormReturn<TValues>["control"];
  name: keyof TValues & string;
  render: (props: {
    field: {
      name: keyof TValues & string;
      value: string;
      onChange: (
        event:
          | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          | string,
      ) => void;
      onBlur: () => void;
      ref: React.RefCallback<HTMLInputElement | HTMLTextAreaElement>;
    };
    fieldState: {
      error?: {
        message?: string;
      };
    };
    formState: FormContextValue["formState"];
  }) => React.ReactNode;
};

function FormField<TValues extends Record<string, string>>({
  control,
  name,
  render,
}: FormFieldProps<TValues>) {
  const form =
    React.useContext(FormContext) ?? (control as FormContextValue | undefined);

  if (!form) {
    throw new Error("FormField must be used within a Form");
  }

  const fieldState = form.formState.errors[name]
    ? { error: { message: form.formState.errors[name] } }
    : {};

  return (
    <FormFieldContext.Provider value={{ name }}>
      {render({
        field: {
          name,
          value: form.control.values[name] ?? "",
          onChange: (event) => {
            const value =
              typeof event === "string" ? event : event.target.value;

            form.control.setValue(name, value);
          },
          onBlur: () => undefined,
          ref: () => undefined,
        },
        fieldState,
        formState: form.formState,
      })}
    </FormFieldContext.Provider>
  );
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function FormLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

function FormControl({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function FormMessage({ className, children }: React.ComponentProps<"p">) {
  const field = React.useContext(FormFieldContext);
  const form = React.useContext(FormContext);

  if (!field || !form) {
    return null;
  }

  const message = form.formState.errors[field.name];

  if (!message && !children) {
    return null;
  }

  return (
    <p className={cn("text-sm text-destructive", className)}>
      {message ?? children}
    </p>
  );
}

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage };
