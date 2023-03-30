import { DirectiveBinding } from 'vue';

export const clickOutside = {
    beforeMount(el: any, binding: DirectiveBinding) {
        el.clickOutsideEvent = (evt: Event) => {
            evt.stopPropagation();
            if (!(el === evt.target || el.contains(evt.target))) {
                binding.value(evt, el);
            }
        };
        window.requestAnimationFrame(() => {
            document.addEventListener('click', el.clickOutsideEvent);
        });
    },
    unmounted(el: any) {
        document.removeEventListener('click', el.clickOutsideEvent);
    }
};
