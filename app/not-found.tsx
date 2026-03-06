"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";


function NotFoundPage() {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">Page not found.</p>
        <Link href="/">
          <Button onClick={() => {}} variant="primary">
            Go home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;