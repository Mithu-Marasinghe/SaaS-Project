import { Suspense } from "react";
import invitePage from "./invite-client";

export default function InvitePage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <InvitePage />
        </Suspense>
    )
}