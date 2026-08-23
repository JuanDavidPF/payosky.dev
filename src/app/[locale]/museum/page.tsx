import PageTitle from "@/src/components/PageTitle/PageTitle";
import { Surface } from "@heroui/react/surface";

export default function MuseumPage() {

    return (
        <Surface variant="transparent" className="flex-1">
            <PageTitle pageId="museum" />
        </Surface>
    );
}