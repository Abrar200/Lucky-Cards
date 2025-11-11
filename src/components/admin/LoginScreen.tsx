import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (role: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('Super Admin');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 bg-brand-red rounded-2xl p-8 shadow-2xl">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/685afce20bfda24fc0f1d36c_1762860287490_25f47fd2.png" 
            alt="Lucky Cards Logo" 
            className="w-full max-w-sm mx-auto"
          />
          <p className="text-white text-lg mt-4 font-medium">Super Admin Panel</p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border shadow-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-brand-gold-mid focus:ring-1 focus:ring-brand-gold-mid outline-none transition-colors"
                placeholder="admin@luckycards.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-brand-gold-mid focus:ring-1 focus:ring-brand-gold-mid outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-brand-gold-highlight via-brand-gold-mid to-brand-gold-deep text-brand-black font-bold rounded-lg hover:opacity-90 transition-opacity text-lg shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <span className="text-brand-gold-mid text-xl">♠</span>
            <span className="text-brand-gold-mid text-xl">♣</span>
            <span className="text-brand-red text-xl">♥</span>
            <span className="text-brand-red text-xl">♦</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
