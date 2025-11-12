import { Link } from 'react-router-dom';
import { Wrench, Lightbulb } from 'lucide-react';

/**
 * Component that processes text with special codes for techniques and tools
 * Format: [tecnica:ID:nombre] or [herramienta:ID:nombre]
 * Example: "Primero debes [tecnica:5:caramelizar] las cebollas usando un [herramienta:3:sartén]"
 *
 * @param {string} text - The text with special codes
 * @param {string} className - Optional className for the container
 */
const LinkedText = ({ text, className = '' }) => {
  if (!text) return null;

  // Regular expression to match [tecnica:ID:nombre] or [herramienta:ID:nombre]
  const regex = /\[(tecnica|herramienta):(\d+):([^\]]+)\]/g;

  const processText = (inputText) => {
    const segments = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(inputText)) !== null) {
      const [fullMatch, type, id, name] = match;
      const startIndex = match.index;

      // Add text before the match
      if (startIndex > lastIndex) {
        segments.push({
          type: 'text',
          content: inputText.slice(lastIndex, startIndex),
          key: `text-${lastIndex}`
        });
      }

      // Add the link
      const path = type === 'tecnica'
        ? `/gastronomia/tecnicas/${id}`
        : `/gastronomia/herramientas/${id}`;

      segments.push({
        type: 'link',
        content: name,
        linkType: type,
        path: path,
        key: `link-${startIndex}`
      });

      lastIndex = startIndex + fullMatch.length;
    }

    // Add remaining text
    if (lastIndex < inputText.length) {
      segments.push({
        type: 'text',
        content: inputText.slice(lastIndex),
        key: `text-end`
      });
    }

    // If no matches found, return the original text
    if (segments.length === 0) {
      segments.push({
        type: 'text',
        content: inputText,
        key: 'text-all'
      });
    }

    return segments;
  };

  const segments = processText(text);

  return (
    <span className={className}>
      {segments.map((segment) => {
        if (segment.type === 'text') {
          return <span key={segment.key}>{segment.content}</span>;
        } else {
          const Icon = segment.linkType === 'tecnica' ? Lightbulb : Wrench;
          const typeLabel = segment.linkType === 'tecnica' ? 'técnica' : 'herramienta';

          return (
            <Link
              key={segment.key}
              to={segment.path}
              className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium underline decoration-dotted underline-offset-2 transition-colors"
              title={`Ver ${typeLabel}: ${segment.content}`}
            >
              <Icon className="w-3.5 h-3.5 inline-block" />
              {segment.content}
            </Link>
          );
        }
      })}
    </span>
  );
};

export default LinkedText;
