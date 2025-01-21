import { HomeIcon, UserCircleIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const navListItems = [
  { label: "Home", icon: HomeIcon, link: "/admin/home" },
  { label: "Clientes", icon: UserCircleIcon, link: "/admin/clientes" },
  { label: "Médico", icon: UserIcon, link: "/admin/medico" },
  { label: "Fornecedores", icon: UserCircleIcon, link: "/admin/suppliers" },
  { label: "Produtos", icon: UserCircleIcon, link: "/admin/products" },
  { label: "Agendamentos", icon: UserCircleIcon, link: "/admin/appointmentsProducts" },
  { label: "Movimentos do Estoque", icon: UserCircleIcon, link: "/admin/stockmovements" },
  { label: "Estoque Mínimo", icon: UserCircleIcon, link: "/admin/stockmovements" },
];

export default function SidebarMenu() {
  return (
    <div className="flex flex-col h-full p-5">
      <Typography as="a" href="#" className="text-white text-2xl font-bold mb-6">
        OTICA
      </Typography>

      <ul className="space-y-3">
        {navListItems.map(({ label, icon, link }) => (
          <li key={label}>
            <Link
              to={link}
              className="flex items-center gap-3 p-3 text-gray-300 hover:bg-blue-600 rounded-lg"
            >
              
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
