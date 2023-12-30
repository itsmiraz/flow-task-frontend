import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { LoginValidation } from "@/Validation";
import { loginUser } from "@/Services/Auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [cookies, setCookie] = useCookies(["dreamHomeAccessToken"]);

  const [Error, setError] = useState<string>("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      const result = await loginUser(values);

      if (result.status === 201) {
        // console.log(result);
        localStorage.setItem("currentUser", JSON.stringify(result.data.data));
        setCookie("dreamHomeAccessToken", result.data.token);
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
    <div className="h-screen">
      <Form {...form}>
        <div className="h-full grid grid-cols-2">
          <div className="h-full w-full bg-cover bg-center bg-no-repeat bg-[url('https://ideogram.ai/api/images/direct/Zp26Xe-ATtqALsgqFSjZbw.jpg')] overflow-hidden"></div>
          <div className="h-full w-full rounded-r-2xl flex justify-center items-center bg-primary-2 mx-auto">
            <div className="w-1/2">
              <div>
                <h2 className="text-xl font-medium pb-4">Login</h2>
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1  w-full"
              >
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
                  Login
                </Button>
              </form>
              <Separator />
              <p className="base-light">
                Don't Have an Account{" "}
                <span className="hover:underline ">
                  <Link to={"/auth/register"}>Register</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
