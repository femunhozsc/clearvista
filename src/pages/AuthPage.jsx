import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Chrome, Github } from 'lucide-react';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithOAuth, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let error;
      if (isSignUp) {
        const { error: signUpError } = await signUp({ email, password });
        error = signUpError;
        if (!error) toast({ title: 'Cadastro realizado!', description: 'Verifique seu e-mail para confirmação.' });
      } else {
        const { error: signInError } = await signIn({ email, password });
        error = signInError;
      }
      if (error) throw error;
    } catch (error) {
      toast({
        title: 'Erro de autenticação',
        description: error.message || 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) throw error;
    } catch (error) {
      toast({
        title: `Erro com ${provider}`,
        description: error.message || 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/33ada24a-4209-40bf-8357-760f342e2f97/2fa8c53c21b0699392da311f1b677230.png";


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-gradient-to-br from-background to-muted/30 p-4"
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-card shadow-xl rounded-lg border border-border">
        <div className="text-center">
          <img src={logoUrl} alt="Clearview Vista Logo" className="w-12 h-12 mx-auto mb-4 invert dark:invert-0" />
          <h1 className="text-3xl font-bold text-primary">{isSignUp ? 'Criar Conta' : 'Login'}</h1>
          <p className="text-muted-foreground">
            {isSignUp ? 'Junte-se à Clearview Vista.' : 'Bem-vindo(a) de volta!'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-background focus:ring-primary"
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
            {loading ? 'Processando...' : (isSignUp ? <><UserPlus className="mr-2 h-4 w-4" /> Criar Conta</> : <><LogIn className="mr-2 h-4 w-4" /> Entrar</>)}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Ou continue com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => handleOAuthSignIn('google')} disabled={loading} className="border-border hover:bg-muted">
            <Chrome className="mr-2 h-4 w-4 text-[#DB4437]" /> Google
          </Button>
          <Button variant="outline" onClick={() => handleOAuthSignIn('github')} disabled={loading} className="border-border hover:bg-muted">
            <Github className="mr-2 h-4 w-4 text-foreground" /> GitHub
          </Button>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:text-primary/80 px-1">
            {isSignUp ? 'Faça login' : 'Crie uma agora'}
          </Button>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthPage;