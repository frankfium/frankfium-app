export const prerender = false;
if (typeof document !== 'undefined') {
    const curs = document.querySelector<HTMLElement>('.cursor');

    if (curs !== null) {

        document.addEventListener('mousemove', (e) => {
            let x = e.pageX;
            let y = e.pageY;
            curs.style.left = (x - 22) + "px";
            curs.style.top = (y - 22) + "px";
        });

        document.addEventListener('mouseleave', (e) => {
            let x = e.pageX;
            let y = e.pageY;
            curs.style.left = (x - 22) + "px";
            curs.style.top = (y - 22) + "px";
        });

    }
   
}
