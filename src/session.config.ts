const SESSION_NAME = 'userSession';
const COOKIE_NAME = 'sessionId';
const TIMEOUT = 60 * 60 * 1000; // 1小时

export function saveSession(sessionData: any) {
    localStorage.setItem(SESSION_NAME, JSON.stringify(sessionData));
    const now = new Date();
    now.setTime(now.getTime() + TIMEOUT);
    document.cookie = `${COOKIE_NAME}=${sessionData.id};expires=${now.toUTCString()};path=/`;
}

export function getSession() {
    const sessionData = localStorage.getItem(SESSION_NAME);
    if (sessionData) {
        return JSON.parse(sessionData);
    }
    return null;
}

export function deleteSession() {
    localStorage.removeItem(SESSION_NAME);
    document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}
