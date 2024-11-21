export function getUsername() {
    if (typeof window !== 'undefined') {
        const cookies = document.cookie.split('; ');
        const usernameCookie = cookies.find(cookie => cookie.startsWith('username='));

        if (usernameCookie) {
            return usernameCookie.split('=')[1];
        }
    }

    return null;
}

export const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
