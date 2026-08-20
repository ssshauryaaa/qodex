import { SEED_HOTSPOTS } from "@/lib/hotspots";
import { WORKER_LOCATION, distanceKm } from "@/lib/geo";
import JobsList from "@/components/jobs/JobsList";

export const metadata = {
    title: "Nearby jobs — WasteYatra",
};

export default function JobsPage() {
    const jobs = SEED_HOTSPOTS.filter((h) => h.status === "open").map((h) => ({
        ...h,
        distanceKm: distanceKm(WORKER_LOCATION.lat, WORKER_LOCATION.lng, h.lat, h.lng),
    }));

    return <JobsList initialJobs={jobs} />;
}