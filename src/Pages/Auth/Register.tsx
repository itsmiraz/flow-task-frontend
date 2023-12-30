import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import logo from "/Image/logo.png";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { RegisterValidation } from "@/Validation";
import { Link } from "react-router-dom";
import { RegisterUser } from "@/Services/Auth";
import { TOKEN_NAME } from "@/Constants";

const Register = () => {
  const [Error, setError] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies([TOKEN_NAME.FLOW_TASK_ACCESS_TOKEN]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof RegisterValidation>>({
    resolver: zodResolver(RegisterValidation),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegisterValidation>) {
    // Do something with the form values.

    try {
      const result = await RegisterUser(values);

      if (result.status === 201) {
        // console.log(result);
        setCookie(TOKEN_NAME.FLOW_TASK_ACCESS_TOKEN, result.data.token);
        localStorage.setItem("currentUser", result.data.data);
        setError("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Some Thing Went Wrong");
      }
      console.log(err);
      // setError(err.data.message);
    }
  }
  return (
    <>
      <Form {...form}>
        <div className=" grid grid-cols-2">
          <div className="order-last rounded-r-2xl overflow-hidden ">
            <img
              src="https://ideogram.ai/api/images/direct/GGgNn-ffSGiwuutKjmY-8A.jpg"
              alt=""
            ></img>
          </div>
          <div className="relative w-full rounded-l-2xl flex justify-center items-center bg-primary-2 mx-auto">
            <div className="w-24 absolute top-10 left-10">
              <img src={logo} alt=""></img>
            </div>
            <div className="w-1/2">
              <div>
                <h2 className="h3-semibold pb-4">Register</h2>
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1  w-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Write Down Your Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Write Down Your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Type your Password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-red-500 text-sm">{Error && Error}</p>
                <Button
                  className={buttonVariants({ size: "sm" })}
                  type="submit"
                >
                  Register
                </Button>
              </form>
              <Separator />
              <p className="base-light">
                Already Have an Account{" "}
                <span className="hover:underline ">
                  <Link to={"/"}>Login</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Register;
