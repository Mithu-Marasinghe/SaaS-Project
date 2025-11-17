'use client'

import { useRouter } from "next/navigation";

export function TeamButton() {
    const router = useRouter();

    return <button className="px-4 py-6 bg-blue-500 rounded" onClick={() => router.push('/teams')}>View Teams</button>

}