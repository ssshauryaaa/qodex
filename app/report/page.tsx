"use client";

import { useEffect, useMemo, useState } from "react";

import StepProgress from "@/components/report/StepProgress";
import PhotoStep from "@/components/report/PhotoStep";
import LocationStep from "@/components/report/LocationStep";
import CategoryStep from "@/components/report/CategoryStep";
import TriageLoader from "@/components/report/TriageLoader";
import ConfirmationScreen from "@/components/report/ConfirmationScreen";
import StickyActionBar from "@/components/report/StickyActionBar";
import ReportBackground from "@/components/report/ReportBackground";
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

    // Listen for demo location preset selection events
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
                // fall back to a Delhi demo pin so the flow never dead-ends
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
        <div className="relative h-dvh max-h-dvh w-full flex flex-col bg-sand overflow-hidden no-scrollbar">
            {/* Interactive Animated Background Elements & Glows */}
            <ReportBackground />

            {/* Main Content Area - Strictly Single Screen Fit */}
            <div className="relative z-10 flex flex-col h-dvh max-h-dvh justify-between px-3 sm:px-6 pt-16 pb-2 overflow-hidden no-scrollbar">
                <main className="mx-auto w-full max-w-2xl flex-1 flex flex-col justify-center overflow-hidden no-scrollbar py-2">
                    {/* Glassmorphic Container Card for Form Steps */}
                    <div className="rounded-3xl border border-white/80 bg-white/85 p-4 sm:p-6 shadow-xl shadow-ink/5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between max-h-[calc(100dvh-130px)] overflow-y-auto no-scrollbar">
                        {showChrome && <StepProgress current={step} />}

                        <div className="flex-1 my-auto overflow-y-auto no-scrollbar py-1">
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
                    <div className="mx-auto w-full max-w-2xl pb-1">
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