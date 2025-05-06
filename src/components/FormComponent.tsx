import type { PropsWithChildren } from "react";
import {
  FormProvider,
  type FieldValues,
  type FormProviderProps,
} from "react-hook-form";

type FormComponentProps<TFieldValues extends FieldValues> = PropsWithChildren<{
  methods: Omit<FormProviderProps<TFieldValues>, "children">;
  onSubmit: (data: TFieldValues) => void;
}>;

const FormComponent = <TFieldValues extends FieldValues>({
  children,
  methods,
  onSubmit,
}: FormComponentProps<TFieldValues>) => {
  return (
    <FormProvider {...methods}>
      <form
        style={{ width: "100%", height: "100%" }}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormComponent;
