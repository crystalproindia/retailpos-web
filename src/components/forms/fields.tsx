import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Form field primitives. Labels are always visible; errors are announced
 * via aria-describedby. Ready to wire to the backend lead API later.
 */

const inputBase =
  "w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 aria-[invalid=true]:border-red-500";

interface FieldWrapProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FieldWrap({ label, htmlFor, error, required, children }: FieldWrapProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-accent-600"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

export const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput(
  { error, className, id, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && id ? `${id}-error` : undefined}
      className={cn(inputBase, className)}
      {...props}
    />
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string };

export function Select({ error, className, id, children, ...props }: SelectProps) {
  return (
    <select
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && id ? `${id}-error` : undefined}
      className={cn(inputBase, "appearance-none bg-white", className)}
      {...props}
    >
      {children}
    </select>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string };

export function Textarea({ error, className, id, ...props }: TextareaProps) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && id ? `${id}-error` : undefined}
      className={cn(inputBase, "min-h-28", className)}
      {...props}
    />
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export function Checkbox({ label, id, className, ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className={cn("flex items-start gap-2.5 text-sm text-ink-muted", className)}>
      <input
        type="checkbox"
        id={id}
        className="mt-0.5 h-4 w-4 rounded-xs border-line text-brand-600 focus:ring-brand-500"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
