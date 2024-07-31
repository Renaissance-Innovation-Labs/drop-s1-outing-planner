import React from 'react';
import parse, { domToReact, Element, DOMNode } from 'html-react-parser';
import Image from 'next/image';

// Function to handle replacement of HTML nodes
const replaceHtmlNode = (domNode: Element): any => {
  const children = domToReact(domNode.children as DOMNode[], {
    replace: (childNode) => {
      if (childNode instanceof Element) {
        return replaceHtmlNode(childNode);
      }
      return childNode;
    },
  });

  switch (domNode.name) {
    case 'h1':
      return <h1 className="text-xl font-bold mb-4">{children}</h1>;
    case 'h2':
      return <h2 className="text-lg font-bold mb-4">{children}</h2>;
    case 'p':
      return <p className="mb-2">{children}</p>;
    case 'ul':
      return <ul className="list-disc pl-5 mb-2">{children}</ul>;
    case 'ol':
      return <ol className="list-decimal pl-5 mb-2">{children}</ol>;
    case 'li':
      return <li className="mb-2">{children}</li>;
    case 'img':
      return (
        <Image
          src={domNode.attribs.src}
          alt={domNode.attribs.alt || ''}
          className="h-56 w-56"
        />
      );
    case 'a':
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={domNode.attribs.href}
          className="underline text-red-800"
        >
          {children}
        </a>
      );
    case 'strong':
      return <strong className="font-semibold">{children}</strong>;
    case 'em':
      return <em className="italic">{children}</em>;
    case 'b':
      return <b className="font-bold">{children}</b>;
    default:
      return children;
  }
};

// Main function to format HTML content
const formatHtmlContent = (html: string): any => {
  if (typeof html !== 'string') {
    return null;
  }

  return parse(html, {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        return replaceHtmlNode(domNode);
      }
      return null;
    },
  });
};

// Component to render formatted text
interface Message {
  message: {
    role: string;
    content?: string;
  };
}

const FormattedText = ({ message }: Message) => {
  return (
    <div
      className={`${
        message.role === 'assistant' ? 'bg-pink-100' : 'bg-[#f5f5f5]'
      } text-black text-sm p-2 w-fit max-w-[90%] md:max-w-[80%] rounded-md`}
    >
      {formatHtmlContent(message.content || '')}
    </div>
  );
};

export default FormattedText;
