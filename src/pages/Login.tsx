import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import verifyJwt from "@/utils/verifyJwt";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [login, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.success === true) {
        const userData = verifyJwt(res.data.accessToken) as TUser;
        dispatch(setUser({ user: userData, token: res.data.accessToken }));
        toast.success(res.message);
        navigate(from, { replace: true });
        setIsSuccess(true);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  return (
    <div className=" flex justify-center items-center bg-white  relative mt-20">
      <div className="w-full md:w-[500px] px-4">
        <div className="bg-accent rounded-lg px-10 py-5 shadow-lg">
          <h1 className="mb-6 font-semibold text-secondary text-2xl underline">
            Login
          </h1>

          <MyForm onSubmit={onSubmit} isSuccess={isSuccess}>
            <div className="space-y-5">
              <MyInput
                width="max-w-[400px]"
                name="email"
                type="text"
                label="Email"
              />
              <MyInput
                width="max-w-[400px]"
                name="password"
                type="password"
                label="Password"
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary block mt-4"
            >
              {isLoading ? "Logging In" : "Login"}
            </Button>
          </MyForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
