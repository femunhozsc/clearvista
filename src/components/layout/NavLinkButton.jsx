import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const NavLinkButton = ({ text, path = "#", icon: Icon, isImplemented = true, action, navLinkAction }) => {
  const handleClick = (e) => {
    if (!isImplemented) {
      e.preventDefault();
    }
    navLinkAction(text, path, Icon, isImplemented, action);
  };

  const content = (
    <>
      {Icon && <Icon className="mr-3 h-5 w-5" />}
      {text}
    </>
  );

  if (isImplemented && path !== "#") {
    return (
      <Button asChild variant="ghost" className="w-full justify-start text-base font-normal">
        <Link to={path} onClick={handleClick}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-base font-normal"
      onClick={handleClick}
    >
      {content}
    </Button>
  );
};