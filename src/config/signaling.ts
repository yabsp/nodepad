const SIGNALING_DOMAIN = import.meta.env.VITE_SIGNALING_SERVER_DOMAIN

if (!SIGNALING_DOMAIN) {
    throw new Error("VITE_SIGNALING_SERVER_DOMAIN is not set")
}

export const SIGNALING = [SIGNALING_DOMAIN]
export const domain = SIGNALING_DOMAIN
