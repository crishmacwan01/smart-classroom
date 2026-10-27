"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Google, Github } from "lucide-react"; // using lucide icons as placeholders
import { motion } from "framer-motion";

/**
 * GlassAuthForm component – a glass‑morphism styled authentication form.
 *
 * Props:
 *  - mode: "login" | "signup" (default: "login")
 *  - isPreview: optional flag used by the design system (ignored here)
 */
export const GlassAuthForm = ({ mode = "login", isPreview }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = mode === "login";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // In this demo we simply mock the auth flow.
      // Replace with real API calls when backend is ready.
      await new Promise((res) => setTimeout(res, 800));
      if (isLogin) {
        // Mock successful login
        navigate("/dashboard");
      } else {
        // Mock successful registration
        navigate("/login");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder – integrate real OAuth flow later
    console.log("Google login clicked");
  };

  const handleGithubLogin = () => {
    // Placeholder – integrate real OAuth flow later
    console.log("Github login clicked");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="glass-panel w-full max-w-md p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden shadow-lg border border-white/10 bg-white/10 backdrop-blur-md"
    >
      {/* Animated decorative orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-center text-white">
        {isLogin ? "Welcome Back" : "Create an Account"}
      </motion.h2>

      {error && (
        <motion.p variants={itemVariants} className="text-sm text-red-400 text-center">
          {error}
        </motion.p>
      )}

      <motion.form variants={itemVariants} onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-glass"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-glass"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-glass"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-glass mt-2"
        >
          {loading ? (isLogin ? "Signing in..." : "Signing up...") : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </motion.form>

      <motion.div variants={itemVariants} className="flex items-center gap-4 justify-center mt-4">
        <button onClick={handleGoogleLogin} className="social-btn">
          <Google size={20} />
        </button>
        <button onClick={handleGithubLogin} className="social-btn">
          <Github size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
};
