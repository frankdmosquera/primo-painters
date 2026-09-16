"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the type for the form values
interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}
interface ContactFormProps {
  showContactInfo?: boolean;
}
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+1\s?[0-9]{10,15}$/, "Phone number must be 11 digits")
    .nullable(),
  message: Yup.string().required("Message is required"),
});

const ContactForm = ({ showContactInfo }: ContactFormProps) => {
  const handleSubmit = async (
    values: ContactFormValues,
    { setSubmitting, resetForm }: any,
  ) => {
    const { name, email, phone, message } = values;

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const result = await response.text();

      toast.success("Your message has been sent successfully!", {
        description: "We will get back to you shortly.",
      });

      resetForm();

      setSubmitting(false);
    } catch (error) {
      toast.error(
        "There was an issue sending your message. Please try again.",
        {
          description: "Please check your information and try again.",
        },
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto lg:px-0 px-4 ">
      <p className="text-center text-[36px] leading-[46.34px] text-[#0D378D] font-medium lg:pt-[70px] md:pt-[40px] pt-[30px] lg:pb-[46px] md:pb-[46px] pb-[20px]">
        GET IN TOUCH
      </p>
      <div
        className="flex gap-12 justify-center text-center"
        style={{ textAlign: "left" }}
      >
        {/* contact form  */}
        <div className="contact-form w-full md:max-w-2xl lg:w-[90%] shadow-lg rounded-lg p-6 lg:mt-[-30px] md:mt-[-30px] mt-[-70px] bg-white">
          <Formik<ContactFormValues>
            initialValues={{
              name: "",
              email: "",
              phone: "+1", // Default value with country code
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="mt-5">
                <div className="mb-5 lg:ml-[26px] md:ml-[25px]">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full sm:w-[90%] p-3 text-black bg-[#F3F3F3] rounded-md mx-auto"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-2 mx-auto"
                  />
                </div>

                <div className="mb-5 lg:ml-[26px] md:ml-[25px]">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full sm:w-[90%] p-3 text-black bg-[#F3F3F3] rounded-md mx-auto"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-2 mx-auto"
                  />
                </div>

                <div className="mb-5 lg:ml-[26px] md:ml-[25px]">
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full sm:w-[90%] p-3 text-black bg-[#F3F3F3] rounded-md mx-auto"
                    value={values.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      if (/^\+1\s?[0-9]{0,15}$/.test(value)) {
                        setFieldValue("phone", value);
                      }
                    }}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-2 mx-auto"
                  />
                </div>

                <div className="mb-5 lg:ml-[26px] md:ml-[25px]">
                  <Field
                    as="textarea"
                    name="message"
                    placeholder="Message"
                    rows={4}
                    className="w-full sm:w-[90%] p-3 text-black bg-[#F3F3F3] rounded-md mx-auto"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-2 mx-auto"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full lg:ml-[26px] md:ml-[25px] sm:w-[90%] py-3 mt-4 mb-2 bg-[#0D378D] text-white font-semibold rounded-md hover:bg-primary/90 cursor-pointer mx-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
