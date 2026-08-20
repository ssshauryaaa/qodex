export type Category = "overflow" | "illegal_dump" | "drain_block";

export type Severity = "low" | "medium" | "high";

export type ReportStep = "photo" | "location" | "category" | "triage" | "done";

export interface Coords {
    lat: number;
    lng: number;
}

export interface CategoryOption {
    id: Category;
    label: string;
    description: string;
}

export interface TriageResult {
    isGenuine: boolean;
    isDuplicate: boolean;
    severity: Severity;
    payout: number;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
    {
        id: "overflow",
        label: "Overflowing bin",
        description: "Community bin spilling over onto the street",
    },
    {
        id: "illegal_dump",
        label: "Illegal dumping",
        description: "Waste piled up somewhere it shouldn't be",
    },
    {
        id: "drain_block",
        label: "Drain blockage",
        description: "Plastic or debris clogging a drain",
    },
];

const TRIAGE_TABLE: Record<Category, { severity: Severity; payout: number }> = {
    overflow: { severity: "low", payout: 50 },
    drain_block: { severity: "medium", payout: 90 },
    illegal_dump: { severity: "high", payout: 150 },
};

/**
 * Mock AI triage. In production this calls the real image-classification
 * endpoint and returns genuine/duplicate/severity/payout from the photo.
 */
export function mockTriage(category: Category): TriageResult {
    const result = TRIAGE_TABLE[category];
    return {
        isGenuine: true,
        isDuplicate: false,
        severity: result.severity,
        payout: result.payout,
    };
}

export const SEVERITY_STYLES: Record<
    Severity,
    { bg: string; text: string; label: string }
> = {
    low: { bg: "bg-status-claimed-light", text: "text-status-claimed", label: "Low severity" },
    medium: { bg: "bg-marigold-light", text: "text-marigold-dark", label: "Medium severity" },
    high: { bg: "bg-status-open-light", text: "text-status-open", label: "High severity" },
};