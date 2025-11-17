'use client'

import { Suspense } from "react";
import InvitePageClient from "./invite-client";
import { useRouter } from "next/navigation";

export default function InvitePage() {
    const router = useRouter();

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <InvitePageClient />
            <button className="regButton" onClick={() => router.push('/teams')}>Return</button>
        </Suspense>
    )
}