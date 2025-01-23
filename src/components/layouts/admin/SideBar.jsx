import { Link } from 'react-router-dom';
import { Bars3Icon, HomeIcon, UserCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-tailwind/react';

const navListItems = [
  { label: "Dashboard", icon: HomeIcon, link: "/admin/dashboard" },
  { label: "Agendar consulta", icon: HomeIcon, link: "/admin/scheduleappointment" },
  { label: "Clientes", icon: UserCircleIcon, link: "/admin/clientes" },
  { label: "Médico", icon: UserCircleIcon, link: "/admin/medico" },
  { label: "Fornecedores", icon: UserCircleIcon, link: "/admin/suppliers" },
  { label: "Produtos", icon: UserCircleIcon, link: "/admin/products" },
  { label: "Agendar produtos", icon: UserCircleIcon, link: "/admin/appointmentsProducts" },
  { label: "Movimentos do estoque", icon: UserCircleIcon, link: "/admin/stockmovements" },
  { label: "Estoque", icon: UserCircleIcon, link: "/admin/stockproducts" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-20 p-2 bg-white text-black shadow-md border border-gray-300 rounded-md"
          onClick={toggleSidebar}
        >
          {isOpen ? <span><XCircleIcon className="h-10 w-10" />
            </span> : <span><Bars3Icon className="h-10 w-10 " />
            </span>}
        </button>
      )}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-black w-64 p-4 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-10`}
      >
        <nav>
          <div>
            <Avatar
              src="https://img.freepik.com/vetores-premium/logotipo-de-oculos-de-sol_939690-565.jpg"
              alt="Avatar"
              size="xl" 
              className='mx-auto border-2 border-black mb-4'
            />
          </div>
          <ul className="space-y-2">
            {navListItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.link}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
