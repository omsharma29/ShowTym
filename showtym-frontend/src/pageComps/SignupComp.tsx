import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export default function SignupComp() {
    return (
        <div>
            <SignedOut>
                <SignInButton>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        Sign In
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}
