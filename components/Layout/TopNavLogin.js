import logo from "public/assets/img/logo.png";

import Link from "next/link";
import Image from "next/image";

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TopNavLogin({ toggleSideBar }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      session && setUser(session.user);
    })();
  }, []);

  return (
    <nav className="d-flex  align-items-center fixed-top bg-transparent sb-topnav shadow-sm bg-white navbar navbar-expand navbar-ligth bg-ligth">
      <Link href="/">
        <a className="navbar-brand ps-3 ">
          <Image
            className="rounded-circle p-2"
            src={logo}
            alt="Registraduria"
          />
        </a>
      </Link>
      {
        user && <Link href="/login"><a className="position-absolute mx-4 text-dark end-0">Iniciar session</a></Link>
      }
      
    </nav>
  );
}
