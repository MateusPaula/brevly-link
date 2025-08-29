import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { RedirectingCard } from './redirecting-card'
import { PageNotFound } from './page-not-found'
import { getLinkForRedirect } from '../http/links'

export function RedirectHandler() {
    const { shortUrl } = useParams<{ shortUrl: string }>()
    const navigate = useNavigate()
    const [isRedirecting, setIsRedirecting] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const hasExecuted = useRef(false)

    useEffect(() => {
        if (!shortUrl || hasExecuted.current) {
            if (!shortUrl) {
                setNotFound(true)
                setIsRedirecting(false)
            }
            return
        }

        hasExecuted.current = true

        const redirectToOriginalUrl = async () => {
            try {
                const linkData = await getLinkForRedirect(shortUrl)
                
                if (linkData && linkData.originalUrl) {
                    setTimeout(() => {
                        window.location.href = linkData.originalUrl
                    }, 2000)
                } else {
                    setNotFound(true)
                    setIsRedirecting(false)
                }
            } catch (error) {
                console.error('Error redirecting:', error)
                setNotFound(true)
                setIsRedirecting(false)
            }
        }

        redirectToOriginalUrl()
    }, [shortUrl, navigate])

    if (notFound) {
        return <PageNotFound />
    }

    if (isRedirecting) {
        return <RedirectingCard />
    }

    return null
}