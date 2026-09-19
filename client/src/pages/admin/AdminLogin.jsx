import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // Added Eye icons
import { api, setToken } from "../../lib/adminApi.js";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(email, password);
      setToken(data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite px-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="w-full max-w-sm rounded-sm border border-white/10 bg-panel p-8"
      >
        <div className="mb-8">
          <div className="font-display text-2xl font-bold text-bone">ULTIMATE</div>
          <div className="-mt-1 font-display text-xs tracking-[0.35em] text-accent">CAR DETAILING · ADMIN</div>
        </div>

        <label className="mb-4 block">
          <span className="mb-1.5 block font-body text-xs uppercase tracking-wider text-bone/45">Email</span>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-white/12 bg-graphite px-3 py-2.5 font-body text-sm text-bone focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all" 
            required 
          />
        </label>

        {/* Updated Password Label with Show/Hide Toggle */}
        <label className="mb-6 block">
          <span className="mb-1.5 block font-body text-xs uppercase tracking-wider text-bone/45">Password</span>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-white/12 bg-graphite px-3 py-2.5 pr-10 font-body text-sm text-bone focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all" 
              required 
            />
            {/* Show Password Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-bone/40 hover:text-accent transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>

        {error && <p className="mb-4 font-body text-sm text-danger">{error}</p>}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-full bg-accent px-6 py-3 font-body text-sm font-semibold text-graphite disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </motion.button>
      </motion.form>
    </div>
  );
}