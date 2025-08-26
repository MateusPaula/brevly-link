import brevlyLogo from '..assets/logo_icon.svg'

export function RedirectingCard() {
    return (
        <div>
            <div>
                <img src={brevlyLogo} alt="Brevly Logo" className='w-10 h-10' />
            </div>
            <div className='flex flex-col items-center justify-center gap-4'>
                <span className='text-xl'>Redirecting...</span>
                <div className="flex flex-col items-center justify-center gap-4">
                    <span className='text-xs text-gray-500'>The links will open within a few seconds.</span>
                    <span className='text-xs text-gray-500'>Were you not redirected? <a href="/" className='text-blue-500'>Click here</a></span>
                </div>
            </div>
        </div>
    )
}