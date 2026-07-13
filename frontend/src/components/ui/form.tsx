import * as React from "react"
import { cn } from "@/lib/utils"

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn("space-y-6", className)} {...props} />
))
Form.displayName = "Form"

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, error, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5",
        error && "space-y-2",
        className,
      )}
      {...props}
    />
  ),
)
FormField.displayName = "FormField"

interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    />
  ),
)
FormError.displayName = "FormError"

export { Form, FormField, FormError }
