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
