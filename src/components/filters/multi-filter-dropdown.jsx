import { useState } from "react"

function MultiFilterDropdown({ label, options, selectedValues, onChange, style }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedCount = selectedValues.length
  const buttonText = selectedCount > 0 ? `${label} (${selectedCount})` : label

  function toggleValue(value) {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((selectedValue) => selectedValue !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  return (
    <details
      className="position-relative"
      open={isOpen}
      onMouseLeave={() => setIsOpen(false)}
      style={{ width: "190px" }}
    >
      <summary
        onClick={(e) => {
          e.preventDefault()
          setIsOpen((open) => !open)
        }}
        style={{
          ...style,
          alignItems: "center",
          display: "flex",
          gap: "0.75rem",
          justifyContent: "space-between",
          cursor: "pointer",
          listStyle: "none",
          userSelect: "none",
          width: "100%",
        }}
      >
        <span>{buttonText}</span>
        <span
          style={{
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "6px solid #FFFFFF",
            height: 0,
            width: 0,
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.15s ease",
          }}
        />
      </summary>
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 10,
          width: "100%",
          backgroundColor: "#111122",
          border: "1px solid #4F46E5",
          borderRadius: "8px",
          boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
          padding: "0.5rem",
        }}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="d-flex align-items-center gap-2"
            style={{
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "0.25rem 0.35rem",
              whiteSpace: "nowrap",
            }}
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => toggleValue(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </details>
  )
}

export default MultiFilterDropdown