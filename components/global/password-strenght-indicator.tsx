
import React from "react";
import { Progress } from "@heroui/react";

const calculateStrength = (password: string): number => {
    let strength = 0;

    if (password.length >= 8) strength += 20;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[$@#&!]+/)) strength += 20;

    return Math.min(100, strength);
};

interface PasswordStrengthIndicatorProps {
    password: string;
    label?: boolean;
    className?: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
    password,
    label = true,
    className = "",
}) => {
    const strength = calculateStrength(password);
    let color: "danger" | "primary" | "warning" | "success" = "danger";

    if (strength > 75) color = "success";
    else if (strength > 50) color = "warning";
    else if (strength > 25) color = "primary";

    const getStrengthLabel = () => {
        if (strength <= 25) return "Weak";
        if (strength <= 50) return "Fair";
        if (strength <= 75) return "Good";

        return "Strong";
    };

    return (
        <div className={`my-2 ${className}`}>
            <Progress
                aria-label="Password strength"
                size="md"
                value={strength}
                color={color}
                className="max-w-md"
            />
            {label && (
                <p className="mt-1 text-xs text-gray-600">
                    {getStrengthLabel()}
                </p>
            )}
        </div>
    );
};
