import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-hero">
                <Heart className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              HealthBook
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Your lifelong digital health memory. Track. Understand. Prevent.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/awareness" className="hover:text-foreground transition-colors">Awareness</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Health Timeline</li>
              <li>AI Insights</li>
              <li>Family Accounts</li>
              <li>Emergency QR</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>HIPAA Compliance</li>
              <li>Data Security</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} HealthBook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
