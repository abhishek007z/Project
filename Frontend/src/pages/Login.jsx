import { Lock, Mail, User2Icon, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import api from "../configs/api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload =
        state === "login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const { data } = await api.post(`/api/users/${state}`, payload);

      dispatch(login({ token: data.token, user: data.user }));
      localStorage.setItem("token", data.token);

      toast.success(data.message);
      navigate("/app");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Decorative Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-blue-100/90">
            {state === "login" 
              ? "Sign in to continue to your resume builder" 
              : "Start building your professional resume today"}
          </p>
        </div>

        <div className="p-8">
          {state !== "login" && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <User2Icon className="size-5 text-blue-500" />
                <label className="text-sm font-medium text-white/90">Full Name</label>
              </div>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="size-5 text-blue-500" />
              <label className="text-sm font-medium text-white/90">Email Address</label>
            </div>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Lock className="size-5 text-blue-500" />
                <label className="text-sm font-medium text-white/90">Password</label>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4 inline mr-1" />
                ) : (
                  <Eye className="size-4 inline mr-1" />
                )}
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {state === "login" ? "Signing in..." : "Creating account..."}
              </span>
            ) : (
              state === "login" ? "Sign In" : "Create Account"
            )}
          </button>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => setState((prev) => (prev === "login" ? "register" : "login"))}
              className="w-full text-center text-blue-300 hover:text-white transition-colors group"
            >
              {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                {state === "login" ? "Sign up now" : "Sign in here"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;