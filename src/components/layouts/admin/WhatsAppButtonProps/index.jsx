import React from 'react';
import { Button } from '@material-tailwind/react';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber, message = '' }) => {
  const handleClick = () => {
    const formattedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      color="green"
      ripple={true}
      className="flex items-center gap-2"
    >
      <div className='text-2xl text-green-600 cursor-pointer'>
        <FaWhatsapp />
      </div>
    </div>
  );
};

export default WhatsAppButton;
