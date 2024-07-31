import React from 'react';
import parse, { domToReact, Element, DOMNode } from 'html-react-parser';

// Function to replace HTML nodes with React components and apply styling
const replaceHtmlNode = (domNode: Element): any => {
  // Convert the children of the current DOM node to React elements, recursively applying the same replacement logic
  const children = domToReact(domNode.children as DOMNode[], {
    replace: (childNode) => {
      if (childNode instanceof Element) {
        // If the child node is an element, call replaceHtmlNode recursively
        return replaceHtmlNode(childNode);
      }
      // Otherwise, return the child node as it is
      return childNode;
    },
  });

  // Switch statement to determine how to replace different HTML elements

  switch (domNode.name) {
    case 'h1':
      return <h1 className="text-xl font-bold mb-4">{children}</h1>;
    case 'h2':
      return <h2 className="text-lg font-semibold mb-3">{children}</h2>;
    case 'h3':
      return <h3 className="text-base font-medium mb-2">{children}</h3>;
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
        // eslint-disable-next-line @next/next/no-img-element
        <img
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

// Main function to format HTML content into React components
const formatHtmlContent = (html: string): any => {
  if (typeof html !== 'string') {
    return null;
  }
  // Parse the HTML string and replace nodes using replaceHtmlNode function
  return parse(html, {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // Call replaceHtmlNode for each element in the HTML
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
        message.role === 'assistant' ? 'bg-pink-50' : 'bg-[#f5f5f5]'
      } text-black text-sm p-2 w-fit max-w-[90%] md:max-w-[80%] rounded-md`}
    >
      {formatHtmlContent(message.content || '')}
    </div>
  );
};

export default FormattedText;
