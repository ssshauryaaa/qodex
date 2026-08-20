"use client";

import { useEffect, useMemo, useState } from "react";

import StepProgress from "@/components/report/StepProgress";
import PhotoStep from "@/components/report/PhotoStep";
import LocationStep from "@/components/report/LocationStep";
import CategoryStep from "@/components/report/CategoryStep";
import TriageLoader from "@/components/report/TriageLoader";
import ConfirmationScreen from "@/components/report/ConfirmationScreen";
import StickyActionBar from "@/components/report/StickyActionBar";
import { mockTriage, type Category, type Coords, type ReportStep, type TriageResult } from "@/lib/types";

export default function ReportPage() {
    const [step, setStep] = useState<ReportStep>("photo");

    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const [coords, setCoords] = useState<Coords | null>(null);
    const [locating, setLocating] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const [category, setCategory] = useState<Category | null>(null);
    const [triage, setTriage] = useState<TriageResult | null>(null);

    useEffect(() => {
        const handlePresetCoords = (e: Event) => {
            const customEvent = e as CustomEvent<Coords>;
            if (customEvent.detail) {
                setCoords(customEvent.detail);
                setLocating(false);
            }
        };
        window.addEventListener("qodex-set-coords", handlePresetCoords);
        return () => window.removeEventListener("qodex-set-coords", handlePresetCoords);
    }, []);

    function handlePhotoSelect(file: File) {
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    }

    function handlePhotoClear() {
        setPhotoFile(null);
        setPhotoPreview(null);
    }

    function handleLocate() {
        if (!navigator.geolocation) {
            setLocationError("Location isn't available on this device — enter manually.");
            return;
        }
        setLocating(true);
        setLocationError(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
                setLocating(false);
            },
            () => {
                setCoords({ lat: 28.6139, lng: 77.209 });
                setLocationError("Couldn't get an exact GPS fix — using approximate location.");
                setLocating(false);
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    }

    function goBack() {
        if (step === "location") setStep("photo");
        else if (step === "category") setStep("location");
    }

    function goContinue() {
        if (step === "photo" && photoPreview) setStep("location");
        else if (step === "location" && coords) setStep("category");
        else if (step === "category" && category) {
            setTriage(mockTriage(category));
            setStep("triage");
        }
    }

    const canContinue = useMemo(() => {
        if (step === "photo") return Boolean(photoPreview);
        if (step === "location") return Boolean(coords) && !locating;
        if (step === "category") return Boolean(category);
        return false;
    }, [step, photoPreview, coords, locating, category]);

    function resetFlow() {
        setPhotoFile(null);
        setPhotoPreview(null);
        setCoords(null);
        setLocationError(null);
        setCategory(null);
        setTriage(null);
        setStep("photo");
    }

    const showChrome = step === "photo" || step === "location" || step === "category";

    return (
        <div className="relative min-h-dvh w-full flex flex-col bg-black overflow-x-hidden selection:bg-white selection:text-black">

            {/* Atmospheric dark background glows */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent blur-3xl" />
                <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-white/[0.03] to-transparent blur-3xl" />
                {/* Subtle dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
            </div>

            {/* Main content with top clearance for AppNavbar */}
            <div className="relative z-10 flex flex-col min-h-dvh justify-between px-3 sm:px-6 pt-24 sm:pt-28 pb-6">
                <main className="mx-auto w-full max-w-2xl flex-1 flex flex-col justify-center py-2">
                    {/* Glass card */}
                    <div className="liquid-glass rounded-3xl p-5 sm:p-7 flex flex-col justify-between">
                        {showChrome && <StepProgress current={step} />}

                        <div className="flex-1 my-auto py-2">
                            {step === "photo" && (
                                <PhotoStep preview={photoPreview} onSelect={handlePhotoSelect} onClear={handlePhotoClear} />
                            )}
                            {step === "location" && (
                                <LocationStep
                                    coords={coords}
                                    locating={locating}
                                    error={locationError}
                                    onLocate={handleLocate}
                                />
                            )}
                            {step === "category" && (
                                <CategoryStep selected={category} onSelect={setCategory} />
                            )}
                            {step === "triage" && (
                                <TriageLoader onComplete={() => setStep("done")} />
                            )}
                            {step === "done" && category && triage && (
                                <ConfirmationScreen category={category} triage={triage} onReportAnother={resetFlow} />
                            )}
                        </div>
                    </div>
                </main>

                {showChrome && (
                    <div className="mx-auto w-full max-w-2xl pt-3">
                        <StickyActionBar
                            showBack={step !== "photo"}
                            onBack={goBack}
                            onContinue={goContinue}
                            disabled={!canContinue}
                            isFinalStep={step === "category"}
                            continueLabel={step === "category" ? "Submit report" : "Continue"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}