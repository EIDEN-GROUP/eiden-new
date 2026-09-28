/** Session flag for the first-visit intro, shared by the loader and the layout's head script. */
export const INTRO_SEEN_KEY = "eiden.introSeen";

/** Runs in <head> before first paint, so a repeat visit never shows the server-rendered loader. */
export const introSeenScript = `try{if(sessionStorage.getItem(${JSON.stringify(INTRO_SEEN_KEY)})==="1")document.documentElement.setAttribute("data-intro","seen")}catch(e){}`;
