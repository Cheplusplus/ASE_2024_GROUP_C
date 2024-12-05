// components/ui/dialog.jsx
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm ${className}`}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg ${className}`}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/**
 * A utility component for building the header of a dialog. This component
 * provides sensible default styles for the header of a dialog, including
 * centering the text horizontally on smaller screens and left-aligning the
 * text on larger screens.
 * 
 * @param {Object} props The props object containing props for the component.
 * @param {Object}  props.className The class name to be applied to the root element.
 * @param {string} [props.className] The class name to be applied to the root element.
 * @param {*} [props.children] The children to be rendered inside the component.
 * @returns {React.ReactElement} The `DialogHeader` component
 */
const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

/**
 * A utility component for building the footer of a dialog. This component
 * provides sensible default styles for the footer of a dialog, including
 * centering the content horizontally on smaller screens and right-aligning
 * the content on larger screens.
 * 
 * @param {Object} props The props object containing props for the component.
 * @param {Object}  props.className The class name to be applied to the root element.
 * @param {string} [props.className] The class name to be applied to the root element.
 * @param {*} [props.children] The children to be rendered inside the component.
 * @returns {React.ReactElement} The `DialogFooter` component
 */
const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={`text-sm text-gray-500 ${className}`}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}