import React from 'react';
import PropTypes from 'prop-types';

/**
 * GlassCard – a reusable glassmorphic container.
 *
 * Props:
 * - `title` (string): Optional header title.
 * - `icon` (node): Optional React element (e.g., an icon) displayed next to the title.
 * - `children` (node): Content inside the card.
 * - `className` (string): Additional CSS classes for custom styling.
 */
const GlassCard = ({ title, icon, children, className = '' }) => {
  return (
    <div
      className={`glass-card ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '1.5rem',
        color: '#fff',
        ...{},
      }}
    >
      {title && (
        <div className="glass-card-header" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
          {icon && <span style={{ marginRight: '0.5rem' }}>{icon}</span>}
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>
        </div>
      )}
      <div className="glass-card-body">{children}</div>
    </div>
  );
};

GlassCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

GlassCard.defaultProps = {
  title: null,
  icon: null,
  className: '',
};

export default GlassCard;
