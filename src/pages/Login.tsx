import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import AOBLogo from "@/assets/OAB_logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <img src={OABLogo} alt="OAB" className="h-16 w-16 mb-3" />
          <h1 className="text-2xl font-serif font-light">{t("auth.welcome")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("auth.loginSubtitle")}</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-6 space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("auth.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 bg-secondary/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-accent/30"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("auth.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 bg-secondary/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-accent/30"
              placeholder={t("auth.passwordPlaceholder")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {loading ? t("auth.loggingIn") : t("auth.login")}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {t("auth.noAccount")}{" "}
          <Link to="/register" className="text-foreground font-medium hover:underline">
            {t("auth.createAccount")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
export default LoginPage;
