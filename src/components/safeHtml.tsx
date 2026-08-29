import * as React from "react"
import DOMPurify from "dompurify"
import * as domPurify from "dompurify"

/**
 * Default set of HTML tags considered safe for rendering user content.
 */
const DEFAULT_ALLOWED_TAGS = [
  'p', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'b', 'i', 'em', 'strong', 'u', 's', 'del', 'ins', 'mark',
  'a',
  'img', 'figure', 'figcaption',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
  'div', 'span',
  'sup', 'sub',
  'abbr', 'time',
  'details', 'summary',
];

const DEFAULT_ALLOWED_ATTR = [
  'href', 'target', 'rel',
  'src', 'alt', 'width', 'height', 'loading',
  'class', 'id',
  'colspan', 'rowspan',
  'datetime', 'title',
  'open',
];


/**
 * SafeHTML renders an HTML string after sanitizing it with DOMPurify.
 *
 * Usage:
 * The raw HTML string to sanitize and render 
 * html: string;
 * HTML tags to allow (overrides defaults) 
 * allowedTags?: string[];
 * HTML attributes to allow (overrides defaults) 
 * allowedAttributes?: string[];
 * Additional DOMPurify configuration 
 * sanitizeOptions?: DOMPurify.Config;
 * Wrapper element type 
 * as?: keyof JSX.IntrinsicElements;
 * CSS class name for the wrapper 
 * className?: string;
 * Inline styles for the wrapper    
 */

interface SafeHTMLProps {
  /** The raw HTML string to sanitize and render */
  html: string;
  /** HTML tags to allow (overrides defaults) */
  allowedTags?: string[];
  /** HTML attributes to allow (overrides defaults) */
  allowedAttributes?: string[];
  /** Additional DOMPurify configuration */
  sanitizeOptions?: domPurify.Config;
  /** Wrapper element type */
  as?: keyof React.JSX.IntrinsicElements;
  /** CSS class name for the wrapper */
  className?: string;
  /** Inline styles for the wrapper */
  style?: React.CSSProperties;
}

export default function SafeHTML({
    html,
    allowedTags = DEFAULT_ALLOWED_TAGS,
    allowedAttributes = DEFAULT_ALLOWED_ATTR,
    sanitizeOptions = {},
    as = 'div',
    className,
    style}: SafeHTMLProps) {
    const sanitizedHtml = React.useMemo(() => {
        if (!html) return '';
        
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: allowedTags,
            ALLOWED_ATTR: allowedAttributes,
            ALLOW_DATA_ATTR: false,
            ...sanitizeOptions,});}, [html, allowedTags, allowedAttributes, sanitizeOptions]);
    const ComponentToRender = as;
    return (
        <ComponentToRender className={className} style={style} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  );
}