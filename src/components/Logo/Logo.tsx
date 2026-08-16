import Image, { ImageProps } from "next/image";

type LogoVariant = "Isotype" | "Logotype";

interface LogoProps extends Omit<ImageProps, "src" | "alt"> {
    variant: LogoVariant;
}

export default function Logo({ variant, ...imageProps }: LogoProps) {
    return (
        <Image
            src={variant === "Isotype" ? "/Isotype.svg" : "/Logotype.svg"}
            alt={variant === "Isotype" ? "Isotype of Payosky" : "Logotype of Payosky"}
            {...imageProps}
        />
    );
}