import * as React from "react"
import { cva } from "class-variance-authority"
import { AlertCircle, AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
        success: "border-success/50 text-success dark:border-success [&>svg]:text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={alertVariants({ variant })}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className="mb-1 font-medium leading-none tracking-tight"
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="text-sm [&_p]:leading-relaxed"
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertIcon = {
  default: Info,
  destructive: XCircle,
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
}

const AlertWithIcon = React.forwardRef(({ variant = "default", icon: Icon, children, ...props }, ref) => {
  const IconComponent = Icon || AlertIcon[variant] || AlertIcon.default
  return (
    <Alert ref={ref} variant={variant} {...props}>
      <IconComponent className="h-4 w-4" />
      {children}
    </Alert>
  )
})
AlertWithIcon.displayName = "AlertWithIcon"

export { Alert, AlertTitle, AlertDescription, AlertWithIcon }