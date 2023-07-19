let scrollBarWidth: any;
export const setHeight = (elementToScroll: any, elementFooter?: any, breakPoint?: number): any => {
    const elementToScrollNative = elementToScroll;
    breakPoint = breakPoint ? breakPoint : 768;
    const windowHeight: number = window.innerHeight;
    // scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    // console.log('scrollBarWidth: ' + scrollBarWidth);
    // console.log('window.innerHeight: ' + window.innerHeight);
    // console.log('window.innerWidth: ' + window.innerWidth);
    // console.log('document.documentElement.clientWidth: ' + document.documentElement.clientWidth);
    const scrollElementTop = elementToScrollNative.getBoundingClientRect().top;
    const scrollElementFooterHeight: number = elementFooter ? elementFooter?.clientHeight : 0;
    // console.log(elementFooter?.clientHeight);
    // console.log(scrollElementTop, scrollElementFooterHeight);
    const updatedScrollHeight = (windowHeight - scrollElementTop - scrollElementFooterHeight - 20) + 'px';
    // const childElement = elementToScrollNative.querySelector('.scrollChild');
    // if (window.innerWidth < breakPoint) {
    //   elementToScrollNative.closest('.scrollParent')?.appendChild(childElement); 
    //   elementToScroll.nativeElement.remove();
    //   return elementToScrollNative.style.height = null;
    // }
    return elementToScrollNative.style.height = updatedScrollHeight;
}