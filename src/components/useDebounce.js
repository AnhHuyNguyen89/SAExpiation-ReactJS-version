import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
    const [debouncedValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value),delay);
        return () => clearTimeout(handler);
     //eslint-disable-next-line
    }, [value]);
    return debouncedValue
}
export default useDebounce;