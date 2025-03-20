// ColorPicker.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  initialColor?: string;
  onChange?: (color: string) => void;
}

const predefinedColors = [
  '#0072F5', // primary
  '#9750DD', // secondary
  '#17C964', // success
  '#F5A524', // warning
  '#F31260', // error
  '#7828C8', // purple500
  '#06B7DB', // cyan500
  '#FF4ECD', // pink500
  '#009688', // green500
  '#004AAD', // blue500
  '#FF8A00', // orange500
  '#F7D82F', // yellow500
];

export default function ColorPicker({
  initialColor = '#000000',
  onChange,
}: ColorPickerProps) {
  const [color, setColor] = useState(initialColor);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChange?.(newColor);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;

    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      handleColorChange(newColor);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="h-10 w-24 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open color picker"
      />
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-10 mt-2 w-64 rounded-md bg-white p-4 shadow-lg"
        >
          <div className="mb-4 grid grid-cols-4 gap-2">
            {predefinedColors.map((c) => (
              <button
                key={c}
                className="h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: c }}
                onClick={() => handleColorChange(c)}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#RRGGBB"
            value={color}
            onChange={handleInputChange}
            aria-label="Custom color input"
          />
        </div>
      )}
    </div>
  );
}
