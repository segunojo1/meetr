"use client";

import { useState } from "react";
import type { z } from "zod";

type FieldValues = Record<string, string>;

type ResolverResult<TValues extends FieldValues> = {
  values: TValues;
  errors: Partial<Record<keyof TValues & string, string>>;
};

type Resolver<TValues extends FieldValues> = (
  values: TValues,
) => Promise<ResolverResult<TValues>> | ResolverResult<TValues>;

export type UseFormReturn<TValues extends FieldValues> = {
  control: {
    values: TValues;
    errors: Partial<Record<keyof TValues & string, string>>;
    setValue: <TName extends keyof TValues & string>(
      name: TName,
      value: TValues[TName],
    ) => void;
  };
  formState: {
    errors: Partial<Record<keyof TValues & string, string>>;
    isSubmitting: boolean;
  };
  handleSubmit: (
    onValid: (values: TValues) => void | Promise<void>,
  ) => (event?: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

type UseFormOptions<TValues extends FieldValues> = {
  defaultValues: TValues;
  resolver?: Resolver<TValues>;
};

export function useForm<TValues extends FieldValues>({
  defaultValues,
  resolver,
}: UseFormOptions<TValues>): UseFormReturn<TValues> {
  const [values, setValues] = useState<TValues>(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof TValues & string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = <TName extends keyof TValues & string>(
    name: TName,
    value: TValues[TName],
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleSubmit: UseFormReturn<TValues>["handleSubmit"] = (onValid) => {
    return async (event) => {
      event?.preventDefault();
      setIsSubmitting(true);

      try {
        const result = resolver
          ? await resolver(values)
          : { values, errors: {} };

        setErrors(result.errors);

        if (Object.keys(result.errors).length === 0) {
          await onValid(result.values);
        }
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  return {
    control: {
      values,
      errors,
      setValue,
    },
    formState: {
      errors,
      isSubmitting,
    },
    handleSubmit,
  };
}

export function zodResolver<TSchema extends z.ZodTypeAny>(schema: TSchema) {
  return async <TValues extends FieldValues>(
    values: TValues,
  ): Promise<ResolverResult<TValues>> => {
    const parsed = schema.safeParse(values);

    if (parsed.success) {
      return {
        values: parsed.data as TValues,
        errors: {},
      };
    }

    const errors: Partial<Record<keyof TValues & string, string>> = {};

    for (const issue of parsed.error.issues) {
      const fieldName = issue.path[0];

      if (typeof fieldName === "string" && !errors[fieldName as keyof TValues & string]) {
        errors[fieldName as keyof TValues & string] = issue.message;
      }
    }

    return {
      values,
      errors,
    };
  };
}