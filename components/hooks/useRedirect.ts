import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useRedirectEntry from './useRedirectEntry';

export default function useRedirect (path, setEntry) {
    const setRedirect = useRedirectEntry()

    const router = useRouter()

    const callback = useCallback(
        () => {
            setRedirect()
            router.push(path)
        }, 
        [path]
    )

    return callback
}